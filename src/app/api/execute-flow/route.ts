import { NextResponse } from 'next/server';
import {
  executeAIAgentNode,
  executeAPINode,
  executeDescriptionNode,
  executeEndNode,
  executeStartNode,
  executeTextMergeNode
} from '@/controllers/nodes';

// Graph and execution state
let globalGraph: {
  [key: string]: {
    incoming: string[];
    outgoing: string[];
  };
} = {};

let executionResults: { [key: string]: any } = {
  "0": [], "1": [], "2": [], "3": [], "4": []
};

// Build graph from nodes and edges
function buildGraph(nodes: any[], edges: any[]) {
  const graph: {
    [key: string]: {
      incoming: string[];
      outgoing: string[];
    };
  } = {};

  nodes.forEach((node) => {
    graph[node.id] = { incoming: [], outgoing: [] };
  });

  edges.forEach((edge) => {
    graph[edge.source].outgoing.push(edge.target);
    graph[edge.target].incoming.push(edge.source);
  });

  globalGraph = graph;
  
  return graph;
}

// Find reachable nodes from start node using DFS
function getReachableNodes(startNodeId: string) {
  const visited = new Set<string>();
  const stack = [startNodeId];

  while (stack.length > 0) {
    const nodeId = stack.pop()!;
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      globalGraph[nodeId].outgoing.forEach((targetId) => {
        if (!visited.has(targetId)) {
          stack.push(targetId);
        }
      });
    }
  }

  return visited;
}

// Determine execution order using topological sort
function determineExecutionOrder(nodes: any[], edges: any[]) {
  const graph = buildGraph(nodes, edges);
  const startNode = nodes.find((node) => node.data.isStart);
  const endNode = nodes.find((node) => node.data.isEnd);

  if (!startNode || !endNode) return [];

  const reachableNodes = getReachableNodes(startNode.id);
  const inDegree: { [key: string]: number } = {};
  const queue: string[] = [];
  const executionOrder: string[] = [];

  Object.keys(graph).forEach((nodeId) => {
    if (reachableNodes.has(nodeId)) {
      inDegree[nodeId] = graph[nodeId].incoming.filter((id) =>
        reachableNodes.has(id)
      ).length;
      if (inDegree[nodeId] === 0) {
        queue.push(nodeId);
      }
    }
  });

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (reachableNodes.has(currentNode)) {
      executionOrder.push(currentNode);
      graph[currentNode].outgoing.forEach((nextNodeId) => {
        if (reachableNodes.has(nextNodeId)) {
          inDegree[nextNodeId]--;
          if (inDegree[nextNodeId] === 0) {
            queue.push(nextNodeId);
          }
        }
      });
    }
  }

  return executionOrder.filter((nodeId) => reachableNodes.has(nodeId));
}

// Execute node based on type using imported functions
async function executeNode(node: any, incomingResults: any[]) {
  try {
    switch (node.type) {
      case 'Start':
        return await executeStartNode();
      case 'AIAgent':
        return await executeAIAgentNode(incomingResults, node.data);
      case 'API':
        return await executeAPINode(incomingResults, node.data);
      case 'Description':
        return await executeDescriptionNode(incomingResults, node.data);
      case 'End':
        return await executeEndNode(incomingResults);
      case 'TextMerge':
        return await executeTextMergeNode(incomingResults, node.data);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  } catch (error) {
    console.error(`Error executing ${node.type} node:`, error);
    throw error;
  }
}

// Recursive node execution
async function executeNodeRecursively(
  nodes: any[],
  executionOrder: string[],
  index: number = 0
) {
  if (index >= executionOrder.length) {
    return executionResults;
  }

  const nodeId = executionOrder[index];
  const node = nodes.find((n) => n.id === nodeId);

  if (!node) {
    return await executeNodeRecursively(nodes, executionOrder, index + 1);
  }

  try {
    const incomingResults = globalGraph[nodeId]?.incoming
      .map((id) => executionResults[id])
      .filter((result) => result !== undefined) || [];

    const result = await executeNode(node, incomingResults);
    executionResults[nodeId] = result;

    return await executeNodeRecursively(nodes, executionOrder, index + 1);
  } catch (error) {
    console.error(`Error executing node ${nodeId}:`, error);
    return await executeNodeRecursively(nodes, executionOrder, index + 1);
  }
}

// Main execution function
async function start(nodes: any[], edges: any[]) {
  executionResults = { "0": [], "1": [], "2": [], "3": [], "4": [] };
  globalGraph = buildGraph(nodes, edges);
  
  const executionOrder = determineExecutionOrder(nodes, edges);
  
  if (executionOrder.length === 0) {
    throw new Error('No valid execution order found');
  }

  const results = await executeNodeRecursively(nodes, executionOrder, 0);

  return results;
}

export async function POST(request: Request) {
  try {
    const { nodes, edges } = await request.json();
    console.log("Hello")

    if (!nodes || !edges) {
      return NextResponse.json(
        { error: 'Nodes and edges are required' },
        { status: 400 }
      );
    }

    // Clean nodes by removing client-side specific properties
    const cleanedNodes = nodes.map(node => {
      const { execute, ...dataWithoutExecute } = node.data;
      return {
        ...node,
        data: dataWithoutExecute
      };
    });

    const results = await start(cleanedNodes, edges);

    return NextResponse.json({
      success: true,
      results,
      executionOrder: determineExecutionOrder(cleanedNodes, edges)
    });
  } catch (error) {
    console.error('Error executing flow:', error);
    return NextResponse.json(
      { error: 'Failed to execute flow', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}