import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { Task, Folder } from '@/types/task';

const QUERY_KEYS = {
  FOLDERS: 'folders',
  TASKS: 'tasks',
} as const;

const queryKeys = {
  folders: {
    all: [QUERY_KEYS.FOLDERS] as const,
    byId: (id: number) => [QUERY_KEYS.FOLDERS, id] as const,
  },
  tasks: {
    all: [QUERY_KEYS.TASKS] as const,
    byId: (id: number) => [QUERY_KEYS.TASKS, id] as const,
  },
};

export function useFolders() {
  return useQuery({
    queryKey: queryKeys.folders.all,
    queryFn: () => api.getFolders(),
    staleTime: 30000,
    retry: 2,
  });
}

export function useTasks() {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: () => api.getTasks(),
    staleTime: 30000,
    retry: 2,
  });
}

export function useFolder(id: number) {
  return useQuery({
    queryKey: queryKeys.folders.byId(id),
    queryFn: () => api.getFolder(id),
    enabled: !!id,
    staleTime: 30000,
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folder: Partial<Folder>) => api.createFolder(folder),
    onSuccess: (newFolder) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders.all });
      
      queryClient.setQueryData<Folder[]>(
        queryKeys.folders.all, 
        (old) => old ? [...old, newFolder] : [newFolder]
      );
    },
    onError: (error) => {
      console.error('Failed to create folder:', error);
    },
  });
}

export function useUpdateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Folder> }) => 
      api.updateFolder(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.folders.byId(id) });

      const previousFolder = queryClient.getQueryData<Folder>(
        queryKeys.folders.byId(id)
      );

      queryClient.setQueryData<Folder>(
        queryKeys.folders.byId(id),
        (old) => old ? { ...old, ...updates } : undefined
      );

      return { previousFolder };
    },
    onError: (err, variables, context) => {
      if (context?.previousFolder) {
        queryClient.setQueryData(
          queryKeys.folders.byId(variables.id),
          context.previousFolder
        );
      }
    },
    onSettled: (folder) => {
      if (folder) {
        queryClient.invalidateQueries({ queryKey: queryKeys.folders.all });
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.folders.byId(folder.id) 
        });
      }
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Task> }) => 
      api.updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tasks.byId(id) });
      const previousTask = queryClient.getQueryData<Task>(
        queryKeys.tasks.byId(id)
      );
      queryClient.setQueryData<Task>(
        queryKeys.tasks.byId(id),
        (old) => old ? { ...old, ...updates } : undefined
      );
      return { previousTask };
    },
    onError: (err, variables, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          queryKeys.tasks.byId(variables.id),
          context.previousTask
        );
      }
    },
    onSettled: (folder) => {
      if (folder) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.tasks.byId(folder.id) 
        });
      }
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Partial<Task>) => api.createTask(task),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ 
        queryKey: newTask.folderId 
          ? queryKeys.folders.byId(newTask.folderId)
          : queryKeys.tasks.all 
      });
      const previousFolderData = newTask.folderId
        ? queryClient.getQueryData(queryKeys.folders.byId(newTask.folderId))
        : null;

      if (newTask.folderId) {
        queryClient.setQueryData(
          queryKeys.folders.byId(newTask.folderId), 
          (old: Folder | undefined) => {
            if (!old) return old;
            return {
              ...old,
              tasks: [...old.tasks, { ...newTask, id: 'temp-id' } as Task]
            };
          }
        );
      }
      return { previousFolderData };
    },
    onSuccess: (task) => {
      if (task.folderId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.folders.byId(task.folderId) 
        });
      }
      queryClient.refetchQueries({ queryKey: queryKeys.tasks.all });
    },
    onError: (error, newTask, context) => {
      if (newTask.folderId && context?.previousFolderData) {
        queryClient.setQueryData(
          queryKeys.folders.byId(newTask.folderId),
          context.previousFolderData
        );
      }
      console.error('Failed to create task:', error);
    },
  });
}

interface TaskPositionUpdate {
  id: number;
  position: { x: number; y: number };
}

export function useUpdateTaskPosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, position }: TaskPositionUpdate) => 
      api.updateTaskPosition(id, position),
    onSuccess: (task) => {
      if (task?.folderId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.folders.byId(task.folderId) 
        });
      }
    },
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteFolder(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.folders.all });

      const previousFolders = queryClient.getQueryData<Folder[]>(
        queryKeys.folders.all
      );

      queryClient.setQueryData<Folder[]>(
        queryKeys.folders.all,
        (old) => old?.filter(folder => folder.id !== id)
      );

      return { previousFolders };
    },
    onError: (err, id, context) => {
      if (context?.previousFolders) {
        queryClient.setQueryData(
          queryKeys.folders.all,
          context.previousFolders
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders.all });
    },
  });
}

export function useDuplicateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.duplicateFolder(id),
    onSuccess: (newFolder) => {
      queryClient.setQueryData<Folder[]>(
        queryKeys.folders.all,
        (old) => old ? [...old, newFolder] : [newFolder]
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.folders.all });
    },
    onError: (error) => {
      console.error('Failed to duplicate folder:', error);
    },
  });
}