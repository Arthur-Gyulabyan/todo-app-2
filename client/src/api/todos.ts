/**
 * @file src/api/todos.ts
 * @description TanStack Query hooks for all Todo-related API operations.
 *              Includes hooks for fetching, creating, updating, and deleting todos.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Todo, CreateTodoRequest, UpdateTodoRequest, DeleteTodoRequest } from "@/lib/validators";
import { useToast } from "@/hooks/use-toast";

const TODO_QUERY_KEY = "todos"; // Define a consistent query key

/**
 * Hook to fetch all todo items.
 * Corresponds to `GET /get-all-todos`.
 */
export const useGetAllTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: [TODO_QUERY_KEY],
    queryFn: () => api.get("/get-all-todos"),
  });
};

/**
 * Hook to fetch a single todo item by its ID.
 * Corresponds to `GET /get-todo-by-id`.
 * Assumes `todoID` is passed as a query parameter based on common patterns for this endpoint name.
 */
export const useGetTodoById = (todoID: string | undefined) => {
  return useQuery<Todo, Error>({
    queryKey: [TODO_QUERY_KEY, todoID],
    queryFn: () => api.get(`/get-todo-by-id`, { todoID }),
    enabled: !!todoID, // Only fetch if todoID is provided
  });
};

/**
 * Hook to create a new todo item.
 * Corresponds to `POST /create-todo`.
 */
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Todo, Error, CreateTodoRequest>({
    mutationFn: (newTodo) => api.post("/create-todo", newTodo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] }); // Invalidate all todos to refetch
      toast({
        title: "Success",
        description: `Todo "${data.task}" created successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create todo.",
        variant: "destructive",
      });
    },
  });
};

/**
 * Hook to update an existing todo item.
 * Corresponds to `POST /update-todo`.
 */
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Todo, Error, UpdateTodoRequest>({
    mutationFn: (updatedTodo) => api.post("/update-todo", updatedTodo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] }); // Invalidate all todos
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY, data.todoID] }); // Invalidate specific todo
      toast({
        title: "Success",
        description: `Todo "${data.task}" updated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update todo.",
        variant: "destructive",
      });
    },
  });
};

/**
 * Hook to delete a todo item.
 * Corresponds to `POST /delete-todo`.
 */
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Todo, Error, DeleteTodoRequest>({
    mutationFn: (deleteRequest) => api.post("/delete-todo", deleteRequest),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] }); // Invalidate all todos
      toast({
        title: "Success",
        description: `Todo "${data.task}" deleted successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete todo.",
        variant: "destructive",
      });
    },
  });
};