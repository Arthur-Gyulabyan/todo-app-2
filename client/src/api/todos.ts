import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest,
  errorSchema,
} from "@/lib/validators";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const TODO_QUERY_KEY = ["todos"];

export const useGetTodos = () => {
  const { toast } = useToast();
  return useQuery<Todo[], Error>({
    queryKey: TODO_QUERY_KEY,
    queryFn: async () => {
      try {
        return await api.get<Todo[]>("/get-all-todos");
      } catch (error) {
        const parsedError = errorSchema.safeParse(error);
        toast({
          title: "Error fetching todos",
          description: parsedError.success ? parsedError.data.message : "Failed to load todos.",
          variant: "destructive",
        });
        throw error;
      }
    },
  });
};

export const useGetTodoById = (id: string | undefined) => {
  const { toast } = useToast();
  return useQuery<Todo, Error>({
    queryKey: [...TODO_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) throw new Error("Todo ID is required.");
      try {
        return await api.get<Todo>(`/get-todo-by-id/${id}`);
      } catch (error) {
        const parsedError = errorSchema.safeParse(error);
        toast({
          title: "Error fetching todo",
          description: parsedError.success ? parsedError.data.message : "Failed to load todo.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<Todo, Error, CreateTodoRequest>({
    mutationFn: async (newTodo: CreateTodoRequest) => {
      try {
        return await api.post<Todo>("/create-todo", newTodo);
      } catch (error) {
        const parsedError = errorSchema.safeParse(error);
        toast({
          title: "Error creating todo",
          description: parsedError.success ? parsedError.data.message : "Failed to create todo.",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
      toast({
        title: "Success!",
        description: "Todo created successfully.",
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<Todo, Error, UpdateTodoRequest>({
    mutationFn: async (updatedTodo: UpdateTodoRequest) => {
      try {
        return await api.post<Todo>("/update-todo", updatedTodo);
      } catch (error) {
        const parsedError = errorSchema.safeParse(error);
        toast({
          title: "Error updating todo",
          description: parsedError.success ? parsedError.data.message : "Failed to update todo.",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
      toast({
        title: "Success!",
        description: "Todo updated successfully.",
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<Todo, Error, DeleteTodoRequest>({
    mutationFn: async (todoToDelete: DeleteTodoRequest) => {
      try {
        return await api.post<Todo>("/delete-todo", todoToDelete);
      } catch (error) {
        const parsedError = errorSchema.safeParse(error);
        toast({
          title: "Error deleting todo",
          description: parsedError.success ? parsedError.data.message : "Failed to delete todo.",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
      toast({
        title: "Success!",
        description: "Todo deleted successfully.",
      });
    },
  });
};