import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import toast from "react-hot-toast";

export const createUser = mutation({
  args: {
    owner: v.string(),
    name: v.string(),
    description: v.string(),
    nodes: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        position: v.object({ x: v.number(), y: v.number() }),
        data: v.object({
          value: v.string(),
          isExecuting: v.boolean(),
          input1: v.optional(v.string()),
          input2: v.optional(v.string()),
          endpoint: v.optional(v.string()),
          description: v.optional(v.string()),
          isStart: v.optional(v.boolean()),
          isEnd: v.optional(v.boolean()),
        }),
        measured: v.object({ width: v.number(), height: v.number() }),
      })
    ),
    edges: v.array(
      v.object({
        id: v.string(),
        source: v.string(),
        target: v.string(),
        sourceHandle: v.string(),
        targetHandle: v.string(),
      })
    ),
    monetizationData: v.object({
      monetizationModel: v.string(),
      isMarketplaceListed: v.boolean(),
    }),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Implement your mutation logic here
    await ctx.db.insert("agent", {
      description: args.description,
      owner: args.owner,
      name: args.name,
      nodes: args.nodes,
      edges: args.edges,
      monetizationData: args.monetizationData,
      isActive: args.isActive,
    });
    toast.success("Agest Deployed Sucessfully");
    return { success: true };
  },
});

export const getAgents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agent").take(10);
  },
});

export const getUserAgent = mutation({
  args: {
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    // Implement your mutation logic here
    const agents = await ctx.db
      .query("agent")
      .filter((q) => q.eq(q.field("owner"), args.owner))
      .collect();
    if (agents.length === 0) {
      throw new Error("No agents found for the specified owner");
    }
    return agents;
  },
});

export const getUserCustomModel = mutation({
  args: {
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    // Implement your mutation logic here
    const agents = await ctx.db
      .query("customModel")
      .filter((q) => q.eq(q.field("owner"), args.owner))
      .collect();
    if (agents.length === 0) {
      throw new Error("No agents found for the specified owner");
    }
    return agents;
  },
});

export const getOneAgent2 = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const agent = await ctx.db.query("agent").filter((q) => q.eq(q.field("_id"), args.id)).first();
    if (!agent) {
      throw new Error("Agent not found");
    }
    return agent;
  },
});

export const getOneAgent = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const agent = await ctx.db.query("agent").filter((q) => q.eq(q.field("_id"), args.id)).first();
    if (!agent) {
      throw new Error("Agent not found");
    }
    return agent;
  },
});

export const createCustomModel = mutation({
  args:{
    name:v.string(),
    endpoint:v.string(),
    inputs:v.string(),
    owner:v.string()
  },
  handler:async(ctx,args)=>{
    await ctx.db.insert("customModel",{
      name:args.name,
      endpoint:args.endpoint,
      inputs:args.inputs,
      owner:args.owner
    })
    return {success:true}
  }
})

export const getCustomModels = mutation({
  args:{
    id:v.string()    
  },
  handler:async(ctx,args)=>{
    const customModels = await ctx.db.query("customModel").filter((q) => q.eq(q.field("_id"), args.id)).first();
    if (!customModels) {
      throw new Error("Custom Model not found");
    }
    return customModels;
  }
})

export const getCustomModel = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customModel").take(10);
  },
});