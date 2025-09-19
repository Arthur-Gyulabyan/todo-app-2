import { z } from "zod";

export const errorSchema = z.object({
  message: z.string(),
});

// Schema for a Todo object as returned by the API
export const todoSchema = z.object({
  id: z.string().min(1, "ID is required"),
  task: z.string().min(1, "Task cannot be empty"),
  createdAt: z.string().datetime("Invalid createdAt format"),
  updatedAt: z.string().datetime("Invalid updatedAt format"),
});

// Schema for creating a Todo (request body)
export const createTodoRequestSchema = z.object({
  task: z.string().min(1, "Task cannot be empty"),
});

// Schema for updating a Todo (request body)
export const updateTodoRequestSchema = z.object({
  id: z.string().min(1, "ID is required for update"),
  task: z.string().min(1, "Task cannot be empty for update"),
});

// Schema for deleting a Todo (request body)
export const deleteTodoRequestSchema = z.object({
  id: z.string().min(1, "ID is required for delete"),
});

export type Error = z.infer<typeof errorSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;
export type DeleteTodoRequest = z.infer<typeof deleteTodoRequestSchema>;