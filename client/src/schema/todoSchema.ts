import { z } from "zod";

export const todoSchema = z.object({
  todoID: z.string(),
  task: z.string().min(1, "Task cannot be empty."),
  createdAt: z.string().datetime().optional(), // ISO string
  updatedAt: z.string().datetime().optional(), // ISO string
});

export const createTodoRequestSchema = z.object({
  task: z.string().min(1, "Task cannot be empty."),
});

export const updateTodoRequestSchema = z.object({
  todoID: z.string(),
  task: z.string().min(1, "Task cannot be empty."),
});

export const deleteTodoRequestSchema = z.object({
  todoID: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;
export type DeleteTodoRequest = z.infer<typeof deleteTodoRequestSchema>;