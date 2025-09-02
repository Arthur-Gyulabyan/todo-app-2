import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest,
  ApiError,
} from "@/lib/validators";

const TODO_QUERY_KEY = ["todos"];

// GET All Todos
export const useGetAllTodos = () => {
  return useQuery<Todo[], ApiError>({
    queryKey: TODO_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<Todo[]>("/get-all-todos");
      return data;
    },
  });
};

// GET Todo By ID (assuming query parameter 'id' based on common practice, as OpenAPI path does not specify one)
export const useGetTodoById = (id: string | null) => {
  return useQuery<Todo, ApiError>({
    queryKey: [...TODO_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<Todo>("/get-todo-by-id", {
        params: { id },
      });
      return data;
    },
    enabled: !!id, // Only fetch if ID is provided
  });
};

// POST Create Todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, ApiError, CreateTodoRequest>({
    mutationFn: async (newTodo: CreateTodoRequest) => {
      const { data } = await api.post<Todo>("/create-todo", newTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
  });
};

// POST Update Todo (OpenAPI uses POST for update)
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, ApiError, UpdateTodoRequest>({
    mutationFn: async (updatedTodo: UpdateTodoRequest) => {
      const { data } = await api.post<Todo>("/update-todo", updatedTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
      // Also invalidate specific todo if detail page exists
      queryClient.invalidateQueries({ queryKey: [...TODO_QUERY_KEY, updatedTodo.id] });
    },
  });
};

// POST Delete Todo (OpenAPI uses POST for delete)
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, ApiError, DeleteTodoRequest>({
    mutationFn: async (todoToDelete: DeleteTodoRequest) => {
      const { data } = await api.post<Todo>("/delete-todo", todoToDelete);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
  });
};