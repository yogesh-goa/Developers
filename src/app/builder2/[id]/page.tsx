"use client"
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import AgentBuilder from '@/components/BuilderComponent';

const Page = ({
    params,
  }: {
    params: Promise<{ id: string }>
  }) => {
    const userAgent = useMutation(api.tasks.getOneAgent);
    interface AgentJson {
      nodes: { type: string; id: string; position: { x: number; y: number }; data: any }[];
      edges: { source: string; target: string; type?: string }[];
    }
    
    const [agentJson, setAgentJson] = useState<AgentJson>({ nodes: [], edges: [] });
    useEffect(()=>{
      fetchData();
    },[])
    async function fetchData() {
      const { id } = await params;
      const result = await userAgent({ id: id });
      const { _creationTime, _id, description, ...filteredResult } = result;
      setAgentJson({
        nodes: filteredResult.nodes || [],
        edges: filteredResult.edges || [],
      });
    }
    
  return (
    <div><AgentBuilder initialData={agentJson}/></div>
  )
}

// custom components
// breast cancer orediction
// { name:string, endpoint:"", inputs: string[]}


export default Page
// "use client";
// import React, { useEffect } from "react";

// import { useState, useCallback, useRef, createContext } from "react";
// import {
//   MiniMap,
//   Background,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   ReactFlow,
//   reconnectEdge,
// } from "@xyflow/react";

// import "@xyflow/react/dist/style.css";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent } from "@/components/ui/tabs";

// import {
//   Bot,
//   Save,
//   Play,
//   MessageSquare,
//   GitBranch,
//   FileJson,
//   Upload,
//   Cable,
//   Text,
//   BrainIcon,
//   ScissorsIcon,
//   TextIcon,
// } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import AIAgentNode from "@/components/nodes/AIAgent";
// import TextMergeNode from "@/components/nodes/TextMerge";
// import EndNode from "@/components/nodes/End";
// import StartNode from "@/components/nodes/Start";
// import { MonetizationDialog } from "@/components/MonetizationDialog";
// import APINode from "@/components/nodes/API";
// import DescriptionNode from "@/components/nodes/Description";
// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

// const DataPassing = createContext({});

// const nodeDefinitions = [
//   {
//     type: "Start",
//     icon: <GitBranch className="h-4 w-4" />,
//     label: "Start Node",
//     group: "Processing",
//   },
//   {
//     type: "End",
//     icon: <GitBranch className="h-4 w-4" />,
//     label: "End Node",
//     group: "Processing",
//   },
//   {
//     type: "AIAgent",
//     icon: <Bot className="h-4 w-4" />,
//     label: "AI Agent Node",
//     group: "Models",
//   },
//   {
//     type: "TextMerge",
//     icon: <MessageSquare className="h-4 w-4" />,
//     label: "Text Merge Node",
//     group: "Text",
//   },
//   {
//     type: "API",
//     icon: <Cable className="h-4 w-4" />,
//     label: "API Node",
//     group: "Text",
//   },
//   {
//     type: "Description",
//     icon: <Text className="h-4 w-4" />,
//     label: "Description Node",
//     group: "Text",
//   },
// ];
// const nodeTypes = {
//   AIAgent: AIAgentNode,
//   TextMerge: TextMergeNode,
//   End: EndNode,
//   Start: StartNode,
//   API: APINode,
//   Description: DescriptionNode,
// };

// export default function AgentBuilder({
//     params,
//   }: {
//     params: Promise<{ id: string }>
//   }) {

//     const userAgent = useMutation(api.tasks.getOneAgent);
//     const [agentJson, setAgentJson] = useState({})
//   useEffect(() => {
//     async function fetchData() {
//       const { id } = await params;
//       const result = await userAgent({ id: id });
//       const { _creationTime, _id, description, ...filteredResult } = result;
//       setAgentJson(filteredResult);
//       console.log(agentJson, _creationTime, _id, description);
//     }
//     setNodes(agentJson.nodes);
//     setEdges(agentJson.edges);
//     fetchData();
//   }, [params, userAgent]);

//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [fileUploadIndicator, setFileUploadIndicator] = useState<number>(1);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   let globalGraph = {}; // Changed to normal variable
//   let executionResults = { "0": [], "1": [], "2": [], "3": [], "4": [] };
//   const edgeReconnectSuccessful = useRef(false);

//   // Build a comprehensive graph representation
//   const buildGraph = useCallback(() => {
//     const graph: {
//       [key: string]: {
//         incoming: string[];
//         outgoing: string[];
//       };
//     } = {};

//     nodes.forEach((node) => {
//       graph[node.id] = { incoming: [], outgoing: [] };
//     });

//     edges.forEach((edge) => {
//       graph[edge.source].outgoing.push(edge.target);
//       graph[edge.target].incoming.push(edge.source);
//     });
//     globalGraph = graph; // Update the normal variable directly
//     return graph;
//   }, [nodes, edges]);

//   // Find all nodes reachable from the start node using DFS
//   const getReachableNodes = useCallback(
//     (startNodeId: string) => {
//       const graph = buildGraph();
//       const visited = new Set<string>();
//       const stack = [startNodeId];

//       while (stack.length > 0) {
//         const nodeId = stack.pop()!;
//         if (!visited.has(nodeId)) {
//           visited.add(nodeId);
//           graph[nodeId].outgoing.forEach((targetId) => {
//             if (!visited.has(targetId)) {
//               stack.push(targetId);
//             }
//           });
//         }
//       }

//       return visited;
//     },
//     [buildGraph]
//   );

//   // Topological sort to determine execution order, only including reachable nodes
//   const determineExecutionOrder = useCallback(() => {
//     const graph = buildGraph();
//     const startNode = nodes.find((node) => node.data.isStart);
//     const endNode = nodes.find((node) => node.data.isEnd);

//     if (!startNode || !endNode) return [];

//     const reachableNodes = getReachableNodes(startNode.id);
//     const inDegree: { [key: string]: number } = {};
//     const queue: string[] = [];
//     const executionOrder: string[] = [];

//     Object.keys(graph).forEach((nodeId) => {
//       if (reachableNodes.has(nodeId)) {
//         inDegree[nodeId] = graph[nodeId].incoming.filter((id) =>
//           reachableNodes.has(id)
//         ).length;
//         if (inDegree[nodeId] === 0) {
//           queue.push(nodeId);
//         }
//       }
//     });

//     while (queue.length > 0) {
//       const currentNode = queue.shift()!;
//       if (reachableNodes.has(currentNode)) {
//         executionOrder.push(currentNode);
//         graph[currentNode].outgoing.forEach((nextNodeId) => {
//           if (reachableNodes.has(nextNodeId)) {
//             inDegree[nextNodeId]--;
//             if (inDegree[nextNodeId] === 0) {
//               queue.push(nextNodeId);
//             }
//           }
//         });
//       }
//     }

//     return executionOrder.filter((nodeId) => reachableNodes.has(nodeId));
//   }, [nodes, edges, buildGraph, getReachableNodes]);

//   // Recursive function to execute nodes based on execution order
//   const executeNodeRecursively = async (
//     executionOrder: string[],
//     index: number = 0
//   ) => {
//     // Base case: if index reaches the end of executionOrder, stop
//     if (index >= executionOrder.length) return;

//     const nodeId = executionOrder[index];
//     const node = nodes.find((n) => n.id === nodeId);
//     if (!node) {
//       // Skip to next node if current node not found
//       await executeNodeRecursively(executionOrder, index + 1);
//       return;
//     }

//     try {
//       // Get results from incoming nodes
//       const incomingResults =
//         globalGraph[nodeId]?.incoming
//           .map((id) => executionResults[id])
//           .filter((result) => result !== undefined) || [];

//       //console.log(`Executing node ${nodeId} with inputs:`, incomingResults);

//       // Execute the node with incoming results
//       const result = await node.data.execute(incomingResults, node.data);

//       // Update executionResults
//       executionResults[nodeId] = result;

//       //console.log(`Node ${nodeId} execution result:`, result);

//       // Recursively execute the next node in order
//       await executeNodeRecursively(executionOrder, index + 1);
//     } catch (error) {
//       console.error(`Error executing node ${nodeId}:`, error);
//     }
//   };

//   const start = async () => {
//     // Reset executionResults and globalGraph
//     executionResults = { "0": [], "1": [], "2": [], "3": [], "4": [] };

//     // Build the graph and get execution order
//     globalGraph = buildGraph();
//     const executionOrder = determineExecutionOrder();
//     console.log("Execution Order:", executionOrder);

//     if (executionOrder.length === 0) {
//       console.error("No valid execution order found");
//       return;
//     }

//     // Start recursive execution from the first node in the order
//     await executeNodeRecursively(executionOrder, 0);
//   };

//   /*
//     const start = async () => {
//     try {
//       // Using GET request with query parameters
//       const nodesString = encodeURIComponent(JSON.stringify(nodes));
//       const edgesString = encodeURIComponent(JSON.stringify(edges));
      
     
//       // Alternative using POST request
      
//       const response = await fetch('/api/execute-flow', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ nodes, edges }),
//       });
      
  
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to execute flow');
//       }
  
//       console.log('Execution Results:', data.results);
//       console.log('Execution Order:', data.executionOrder);
      
//       // Update local state with results if needed
//       executionResults = data.results;
      
//     } catch (error) {
//       console.error('Error executing flow:', error);
//       toast.error('Failed to execute flow');
//     }
//   };
//   */

//   const onDragStart = (event, nodeType) => {
//     event.dataTransfer.setData("application/reactflow", nodeType);
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback((event) => {
//     event.preventDefault();

//     //  const reactFlowBounds = event.target.getBoundingClientRect();
//     const type = event.dataTransfer.getData("application/reactflow");

//     // check if the dropped element is a valid node type
//     if (typeof type === "undefined" || !type) {
//       return;
//     }

//     const position = {
//       x: event.screenX,
//       y: event.screenY,
//     };

//     const newNode = {
//       id: `${Date.now()}`, // unique ID
//       type,
//       position,
//       data: {
//         value: 123,
//         isExecuting: false,
//         execute: () => {},
//         ...(type === "Start" && { isStart: true }),
//         ...(type === "End" && { isEnd: true }),
//       },
//     };

//     setNodes((nds) => nds.concat(newNode));
//   }, []);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     [setNodes]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     [setEdges]
//   );

//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     [setEdges]
//   );

//   const exportFlow = () => {
//     const flow = { nodes, edges };
//     const dataStr = JSON.stringify(flow, null, 2);
//     const dataUri =
//       "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
//     const exportFileDefaultName = "agent-flow.json";
//     const linkElement = document.createElement("a");
//     linkElement.setAttribute("href", dataUri);
//     linkElement.setAttribute("download", exportFileDefaultName);
//     linkElement.click();
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const jsonData = JSON.parse(e.target?.result as string);

//         // Validate the uploaded JSON structure
//         if (jsonData.nodes && jsonData.edges) {
//           // Reset nodes and edges state with uploaded data
//           setNodes(jsonData.nodes);
//           setEdges(jsonData.edges);
//           setFileUploadIndicator((prev) => prev + 1);
//         } else {
//           console.error("Invalid JSON structure. Expected { nodes, edges }");
//           alert("Invalid file format. Please upload a valid agent flow JSON.");
//         }
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//         alert("Error uploading file. Please ensure it is a valid JSON.");
//       }
//     };
//     reader.readAsText(file);
//   };

//   const triggerFileUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const renderNodeGroup = (group) => {
//     return nodeDefinitions
//       .filter((node) => node.group === group)
//       .map((node) => (
//         <div
//           key={node.type}
//           className="flex items-center p-2 border shadow rounded-md mb-2 cursor-move hover:bg-muted/50"
//           draggable
//           onDragStart={(event) => onDragStart(event, node.type)}
//         >
//           {node.icon}
//           <span className="ml-2 text-sm">{node.label}</span>
//         </div>
//       ));
//   };

//   const onReconnectStart = useCallback(() => {
//     edgeReconnectSuccessful.current = false;
//   }, []);

//   const onReconnect = useCallback(
//     (oldEdge, newConnection) => {
//       edgeReconnectSuccessful.current = true;
//       setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
//     },
//     [setEdges]
//   );

//   const onReconnectEnd = useCallback(
//     (_, edge) => {
//       if (!edgeReconnectSuccessful.current) {
//         setEdges((eds) => eds.filter((e) => e.id !== edge.id));
//       }
//       edgeReconnectSuccessful.current = true;
//     },
//     [setEdges]
//   );

//   const [isMonetizationDialogOpen, setIsMonetizationDialogOpen] =
//     useState(false);
//   const createAgent = useMutation(api.tasks.createUser);
//   // const rushi = (monetizationData) =>{
//   //   console.log('Agent Monetization Data:', monetizationData);
//   //   console.log(edges,nodes)
//   //   fetch('/api/createAgent', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ nodes, edges ,monetizationData}),
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error('Failed to create agent');
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       console.log('Agent created successfully:', data);
//   //       toast.success("Agent created successfully");
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error creating agent:', error);
//   //       toast.error("Error while uploading")
//   //     });
//   // }
//   const rushi = (monetizationdata) => {
//     console.log(monetizationdata, nodes, edges);
//     createAgent({
//       owner: monetizationdata.userId,
//       name: monetizationdata.name,
//       description:
//         monetizationdata.description || "Automatically generated agent",
//       nodes: nodes.map((node) => {
//         delete node.dragging; // Remove the position property
//         delete node.selected;
//         const { execute, ...rest } = node.data;
//         return {
//           ...node,
//           data: {
//             ...rest,
//             value: String(rest.value), // Convert value to string
//           },
//         };
//       }),
//       edges: edges,
//       monetizationData: {
//         monetizationModel: monetizationdata.monetizationModel,
//         isMarketplaceListed: monetizationdata.isMarketplaceListed,
//       },
//       isActive: true,
//     });
//   };
//   return (
//     <DataPassing.Provider
//       value={{ nodes, edges, setNodes, setEdges, fileUploadIndicator }}
//     >
//       <div className="flex min-h-screen flex-col">
//         <div className="absolute z-10 top-10 right-10 flex items-center gap-4">
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             accept=".json"
//             onChange={handleFileUpload}
//           />
//           <Button
//             variant="outline"
//             className="gap-2"
//             onClick={triggerFileUpload}
//           >
//             <Upload className="h-4 w-4" />
//             Upload
//           </Button>
//           <Button variant="outline" className="gap-2" onClick={exportFlow}>
//             <FileJson className="h-4 w-4" />
//             Save Json
//           </Button>
//           <Button className="gap-2" onClick={start}>
//             <Play className="h-4 w-4" />
//             Test
//           </Button>
//           <Button
//             className="gap-2"
//             onClick={() => setIsMonetizationDialogOpen(true)}
//           >
//             <Save className="h-4 w-4" />
//             Save Agent
//           </Button>
//         </div>
//         <MonetizationDialog
//           isOpen={isMonetizationDialogOpen}
//           onOpenChange={setIsMonetizationDialogOpen}
//           onCreateAgent={rushi}
//         />
//         <main className="flex-1">
//           <Tabs value={"visual"}>
//             <TabsContent value="visual" className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div className="w-1/4 z-20 left-5 top-5 fixed">
//                   <Card className="h-[calc(100vh-5rem)]">
//                     <CardHeader className="pb-3">
//                       <CardTitle>Components</CardTitle>
//                       <CardDescription>
//                         Drag and drop nodes to the canvas
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <ScrollArea className="h-[calc(100vh-16rem)]">
//                         <Accordion type="single" collapsible defaultValue="AI">
//                           <AccordionItem value="Processing">
//                             <AccordionTrigger className="text-sm">
//                               <div className="flex items-center gap-2">
//                                 <ScissorsIcon />
//                                 Processing
//                               </div>
//                             </AccordionTrigger>
//                             <AccordionContent>
//                               {renderNodeGroup("Processing")}
//                             </AccordionContent>
//                           </AccordionItem>

//                           <AccordionItem value="Models">
//                             <AccordionTrigger className="text-sm">
//                               <div className="flex items-center gap-2">
//                                 <BrainIcon />
//                                 Models
//                               </div>
//                             </AccordionTrigger>
//                             <AccordionContent>
//                               {renderNodeGroup("Models")}
//                             </AccordionContent>
//                           </AccordionItem>

//                           <AccordionItem value="Text">
//                             <AccordionTrigger className="text-sm">
//                               <div className="flex items-center gap-2">
//                                 <TextIcon />
//                                 Text
//                               </div>
//                             </AccordionTrigger>
//                             <AccordionContent>
//                               {renderNodeGroup("Text")}
//                             </AccordionContent>
//                           </AccordionItem>
//                         </Accordion>
//                       </ScrollArea>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div className="col-span-4">
//                   <div className="h-screen w-full">
//                     <ReactFlow
//                       nodes={nodes}
//                       edges={edges}
//                       onNodesChange={onNodesChange}
//                       onEdgesChange={onEdgesChange}
//                       onConnect={onConnect}
//                       nodeTypes={nodeTypes}
//                       onDrop={onDrop}
//                       onDragOver={onDragOver}
//                       onReconnectStart={onReconnectStart}
//                       onReconnect={onReconnect}
//                       onReconnectEnd={onReconnectEnd}
//                       fitView
//                     >
//                       <MiniMap />
//                       <Background gap={12} size={1} />
//                     </ReactFlow>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>
//     </DataPassing.Provider>
//   );
// }

// export { DataPassing };
