import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

export async function POST(
  req: NextRequest,
  context: { params: { agentId?: string } }
) {
  try {
    // Fetch AgentID from url
    const { params } = context;
    const { agentId } = await params;
    if (!agentId) throw new Error("agentId is missing");

    // Fetch agent flow
    const agentFlow = await fetchQuery(api.tasks.getOneAgent2, { id: agentId });
    if (!agentFlow) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }
    console.log(JSON.stringify(agentFlow.nodes), JSON.stringify(agentFlow.edges));

    // Fetch body
    const body = req.bodyUsed ? await req.json() : null;
    console.log(body, agentId);

    // Determine the full base URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3000`;
    const apiUrl = `${baseUrl}/api/execute-flow`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nodes: agentFlow.nodes,
        edges: agentFlow.edges,
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to execute flow: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Flow execution result:", result);

    // Extract the last element from executionOrder
    const lastExecutionId = result.executionOrder[result.executionOrder.length - 1];

    // Retrieve the result of the last executed node
    const lastExecutionResult = result.results[lastExecutionId];

    // Log the last execution result
    console.log("Last execution result:", lastExecutionResult);

    return NextResponse.json({ 
      message: "Request received successfully", 
      lastExecutionResult
    });
  } catch (error) {
    console.error("Error at register route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}