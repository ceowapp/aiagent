"use client"
import React, { useState } from 'react';
import { Task, Folder } from '@/types';
import { 
  useFolders, 
  useCreateFolder, 
  useUpdateFolder, 
  useDeleteFolder,
  useDuplicateFolder,
  useCreateTask,
  useUpdateTask 
} from '@/hooks/useTasks';
import { 
  FaFolder, 
  FaFolderPlus, 
  FaPlus, 
  FaTrash, 
  FaEdit,
  FaSpinner,
  FaExclamationTriangle 
} from 'react-icons/fa';

interface Props {
  tasks: Task[];
  onDragStart?: (task: Task) => void;
}

export default function TaskList({ tasks, onDragStart }: Props) {
  const { data: folders, isError, isLoading, error } = useFolders();

  const createFolder = useCreateFolder();
  const updateFolder = useUpdateFolder();
  const deleteFolder = useDeleteFolder();
  const duplicateFolder = useDuplicateFolder();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [editingFolder, setEditingFolder] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [editName, setEditName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDetails, setEditTaskDetails] = useState('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer?.setData('application/json', JSON.stringify(task));
    e.dataTransfer.effectAllowed = 'copy';
    setDraggedTask(task);
    onDragStart?.(task);
  };

  const handleDropInFolder = async (e: React.DragEvent, folderId?: number | null) => {
    console.log("this is folderId", folderId)
    e.preventDefault();
    if (!draggedTask) return;
    try {
      await updateTask.mutateAsync({
        id: draggedTask.id,
        updates: { 
          ...draggedTask,
          folderId: folderId 
        }
      });
    } catch (error) {
      console.error('Failed to move task:', error);
    }
    setDraggedTask(null);
  };

  const handleCreateTask = async (folderId?: number) => {
    try {
      await createTask.mutateAsync({
        type: 'Note',
        title: 'New Task',
        details: '',
        config: {},
        position: { x: 0, y: 0 },
        connections: [],
        folderId
      });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskId: number) => {
    try {
      await updateTask.mutateAsync({
        id: taskId,
        updates: { 
          ...editingTask,
          title: editTaskTitle,
          details: editTaskDetails 
        }
      });
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number, folderId?: number) => {
    try {
      await updateTask.mutateAsync({
        id: taskId,
        updates: { isDeleted: true }
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDuplicateTask = async (task: Task) => {
    try {
      await createTask.mutateAsync({
        ...task,
        id: undefined,
        title: `Copy of ${task.title}`,
        position: { x: task.position.x + 20, y: task.position.y + 20 }
      });
    } catch (error) {
      console.error('Failed to duplicate task:', error);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      await createFolder.mutateAsync({
        name: newFolderName,
        tasks: []
      });
      setNewFolderName('');
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleUpdateFolder = async (id: number) => {
    if (!editName.trim()) return;

    try {
      await updateFolder.mutateAsync({
        id,
        updates: { name: editName }
      });
      setEditingFolder(null);
      setEditName('');
    } catch (error) {
      console.error('Failed to update folder:', error);
    }
  };

  const TaskItem = ({ task, inFolder = false }: { task: Task, inFolder?: boolean }) => (
    <div 
      key={task.id} 
      className={`
        flex items-center p-2 
        ${inFolder ? 'bg-gray-100' : 'bg-white'} 
        rounded cursor-move hover:bg-gray-200 transition
      `}
    >
      {editingTask === task.id ? (
        <div>
          <input 
            type="text"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            className="border rounded px-2 w-full mb-2"
          />
          <textarea
            value={editTaskDetails}
            onChange={(e) => setEditTaskDetails(e.target.value)}
            className="border rounded px-2 w-full mb-2"
            placeholder="Task Details"
          />
          <div className="flex justify-between">
            <button 
              onClick={() => handleUpdateTask(task.id)}
              className="text-green-600"
            >
              Save
            </button>
            <button 
              onClick={() => setEditingTask(null)}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div 
            className="flex items-center cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
          >
            <span className="mr-2">{task.icon}</span>
            {task.title}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                setEditingTask(task.id);
                setEditTaskTitle(task.title);
                setEditTaskDetails(task.details || '');
              }}
              className="text-blue-600"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => handleDuplicateTask(task)}
              className="text-green-600"
            >
              <FaPlus />
            </button>
            <button 
              onClick={() => handleDeleteTask(task.id, task.folderId)}
              className="text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex-none w-72 bg-white shadow-lg p-4 flex flex-col items-center justify-center">
        <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-none w-72 bg-red-50 shadow-lg p-4 flex flex-col items-center justify-center">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <p className="text-red-600 text-center mb-2">Failed to load tasks</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div 
      className="flex-none w-72 bg-white shadow-lg p-4 z-10 overflow-auto max-h-screen rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDropInFolder(e, null)}
    >
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Folders & Notes</h2>
          <button 
            onClick={() => handleCreateTask()}
            className="bg-green-500 text-white p-2 rounded flex items-center"
            disabled={createTask.isPending}
          >
            {createTask.isPending ? <FaSpinner className="animate-spin" /> : <FaPlus />}
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New Folder Name"
            className="flex-grow border rounded px-2 mr-2 text-sm"
          />
          <button 
            onClick={handleCreateFolder}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
            disabled={createFolder.isPending || !newFolderName.trim()}
          >
            {createFolder.isPending ? <FaSpinner className="animate-spin" /> : <FaFolderPlus />}
          </button>
        </div>
      </div>

      {folders?.map((folder) => (
        <div 
          key={folder.id} 
          className="mb-4 border rounded p-2 bg-gray-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropInFolder(e, folder.id)}
        >
          <div className="flex justify-between items-center mb-2">
            {editingFolder === folder.id ? (
              <div className="flex items-center flex-grow">
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-grow border rounded px-2 mr-2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateFolder(folder.id);
                    }
                  }}
                />
                <button 
                  onClick={() => handleUpdateFolder(folder.id)}
                  disabled={updateFolder.isLoading}
                  className="text-green-600"
                >
                  {updateFolder.isLoading ? <FaSpinner className="animate-spin" /> : '✓'}
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <FaFolder className="mr-2" />
                <span className="font-semibold">{folder.name}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleCreateTask(folder.id)}
                disabled={createTask.isPending}
                className="text-green-600"
              >
                {createTask.isPending ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              </button>
              <button 
                onClick={() => {
                  setEditingFolder(folder.id);
                  setEditName(folder.name);
                }}
                className="text-gray-600"
              >
                <FaEdit />
              </button>
              <button 
                onClick={() => handleDeleteFolder(folder.id)}
                disabled={deleteFolder.isLoading}
                className="text-red-600"
              >
                {deleteFolder.isLoading ? <FaSpinner className="animate-spin" /> : <FaTrash />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {folder.tasks?.map(task => (
              <TaskItem key={task.id} task={task} inFolder={true} />
            ))}
          </div>
        </div>
      ))}
      {tasks?.length > 0 && (
        <div className="mt-4 border-t pt-2 w-full">
          <h3 className="text-md font-semibold mb-2">Unassigned Tasks</h3>
          <div className="space-y-2">
            {tasks.filter(t => !t.folderId).map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}