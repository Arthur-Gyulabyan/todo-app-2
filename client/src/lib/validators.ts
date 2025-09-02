/**
 * @file src/lib/validators.ts
 * @description Zod schemas for request/response bodies, mirroring OpenAPI specification.
 *              Used for strong typing and client-side form validation.
 */

import { z } from "zod";

/**
 * Zod schema for a Todo item, as defined in the OpenAPI `Todo` schema.
 */
export const todoSchema = z.object({
  todoID: z.string().min(1, "Todo ID is required"),
  task: z.string().min(1, "Task is required"),
  createdAt: z.string().datetime().optional(), // `datetime` for ISO 8601, optional as backend usually sets it
  updatedAt: z.string().datetime().optional(), // optional as backend usually sets it
});

/**
 * Zod schema for the Create Todo request body, as defined in `CreateTodoRequest`.
 */
export const createTodoRequestSchema = z.object({
  task: z.string().min(1, "Task is required"),
});

/**
 * Zod schema for the Update Todo request body, as defined in `UpdateTodoRequest`.
 */
export const updateTodoRequestSchema = z.object({
  todoID: z.string().min(1, "Todo ID is required"),
  task: z.string().min(1, "Task is required"),
});

/**
 * Zod schema for the Delete Todo request body, as defined in `DeleteTodoRequest`.
 */
export const deleteTodoRequestSchema = z.object({
  todoID: z.string().min(1, "Todo ID is required"),
});

// Export inferred types for convenience
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;
export type DeleteTodoRequest = z.infer<typeof deleteTodoRequestSchema>;