import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest,
  ApiError,
} from "@/lib/validators";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Fetch all todos
export const useGetAllTodos = () => {
  const { toast } = useToast();
  return useQuery<Todo[], ApiError>({
    queryKey: ["todos"],
    queryFn: () => api.get("/get-all-todos"),
    onError: (error) => {
      toast({
        title: "Error fetching todos",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });
};

// Fetch a single todo by ID
export const useGetTodoById = (id: string | undefined) => {
  const { toast } = useToast();
  return useQuery<Todo, ApiError>({
    queryKey: ["todos", id],
    queryFn: () => api.get(`/get-todo-by-id/${id}`),
    enabled: !!id, // Only run query if id is available
    onError: (error) => {
      toast({
        title: `Error fetching todo ${id}`,
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<Todo, ApiError, CreateTodoRequest>({
    mutationFn: (newTodo) => api.post("/create-todo", newTodo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo created successfully!",
        description: `Task: "${data.task}"`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create todo",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });
};

// Update an existing todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<Todo, ApiError, UpdateTodoRequest>({
    mutationFn: (updatedTodo) => api.post("/update-todo", updatedTodo), // OpenAPI uses POST
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo updated successfully!",
        description: `ID: ${data.id}, Task: "${data.task}"`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update todo",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<Todo, ApiError, DeleteTodoRequest>({
    mutationFn: (deleteRequest) => api.post("/delete-todo", deleteRequest), // OpenAPI uses POST
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo deleted successfully!",
        description: `Task: "${data.task}" was removed.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete todo",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });
};