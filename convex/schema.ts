import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  agent: defineTable({
    owner: v.string(),
    description: v.string(),
    name: v.string(),
    nodes: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        position: v.object({ x: v.number(), y: v.number() }),
        measured: v.object({ width: v.number(), height: v.number() }),
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
  }),

  customModel: defineTable({
    name:v.string(),
    owner:v.string(),
    endpoint:v.string(),
    inputs:v.string(),
  })
});


