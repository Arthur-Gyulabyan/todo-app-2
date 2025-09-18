import { z } from "zod";

// --- API Response Schemas ---
export const todoSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
  task: z.string().min(1, "Task is required"),
  createdAt: z.string().datetime().optional(), // Optional as backend generates
  updatedAt: z.string().datetime().optional(), // Optional as backend generates
});

export type Todo = z.infer<typeof todoSchema>;

// --- API Request Schemas ---

// CreateTodoRequest: Based on Todo, but omitting server-generated fields
export const createTodoRequestSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;


// UpdateTodoRequest: Requires id and task
export const updateTodoRequestSchema = z.object({
  id: z.string().min(1, "Todo ID is required for update"),
  task: z.string().min(1, "Task is required for update"),
});
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;


// DeleteTodoRequest: Requires id
export const deleteTodoRequestSchema = z.object({
  id: z.string().min(1, "Todo ID is required for delete"),
});
export type DeleteTodoRequest = z.infer<typeof deleteTodoRequestSchema>;

// Error Schema (for API responses)
export const errorSchema = z.object({
  message: z.string(),
});
export type ApiError = z.infer<typeof errorSchema>;