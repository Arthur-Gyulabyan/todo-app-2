import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest,
} from "../schema/todoSchema";

const API_BASE_URL = "/api/v1";

// Helper for API calls
async function fetcher<T>(
  url: string,
  method: "GET" | "POST",
  body?: object
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function useGetAllTodos() {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: () => fetcher<Todo[]>("/get-all-todos", "GET"),
  });
}

export function useGetTodoById(todoID: string | undefined) {
  return useQuery<Todo, Error>({
    queryKey: ["todos", todoID],
    queryFn: () => fetcher<Todo>(`/get-todo-by-id?todoID=${todoID}`, "GET"),
    enabled: !!todoID, // Only run the query if todoID is provided
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, CreateTodoRequest>({
    mutationFn: (newTodo) => fetcher<Todo>("/create-todo", "POST", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo Created",
        description: "Your new todo has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create todo: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, UpdateTodoRequest>({
    mutationFn: (updatedTodo) =>
      fetcher<Todo>("/update-todo", "POST", updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo Updated",
        description: "Your todo has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update todo: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, DeleteTodoRequest>({
    mutationFn: (todoToDelete) =>
      fetcher<Todo>("/delete-todo", "POST", todoToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo Deleted",
        description: "The todo has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete todo: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}