import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
  task: z.string().min(1, "Task is required"),
  createdAt: z.string().datetime({ message: "Invalid date format for createdAt" }),
  updatedAt: z.string().datetime({ message: "Invalid date format for updatedAt" }).optional().nullable(), // Nullable because OpenAPI does not specify it as required
});

export const createTodoRequestSchema = z.object({
  task: z.string().min(1, "Task is required"),
});

export const updateTodoRequestSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
  task: z.string().min(1, "Task is required"),
});

export const deleteTodoRequestSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;
export type DeleteTodoRequest = z.infer<typeof deleteTodoRequestSchema>;

// For API error responses
export const errorSchema = z.object({
  message: z.string(),
});
export type ApiError = z.infer<typeof errorSchema>;