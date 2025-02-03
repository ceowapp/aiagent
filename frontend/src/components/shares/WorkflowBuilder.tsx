"use client"
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTasks } from '@/hooks/useTasks';
import TaskList from './TaskList';
import WorkflowCanvas from './WorkflowCanvas';
import TaskExecutor from './TaskExecutor';
import { Task, Folder } from '@/types';

export default function WorkflowBuilder() {
  const { data: tasks, isLoading, error } = useTasks();
  const [workflow, setWorkflow] = useState<Task[]>([]);
  const [folders, setFolders] = useState<Folder[]>([
    { id: uuidv4(), name: 'Default Folder', tasks: [] }
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDraggingNewTask, setIsDraggingNewTask] = useState<Task | null>(null);

  const handleWorkflowUpdate = useCallback((newWorkflow: Task[]) => {
    const validatedWorkflow = validateWorkflow(newWorkflow);
    setWorkflow(validatedWorkflow);
  }, []);

  const handleTaskDrop = (position: { x: number; y: number }, task?: Task) => {
    if (!task) return;
    const newNode: Task = {
      id: uuidv4(),
      type: task.id,
      title: `New ${task.title}`,
      details: '',
      position,
      connections: [],
      config: { ...task.defaultConfig }
    };
    const updatedWorkflow = [...workflow, newNode];
    handleWorkflowUpdate(updatedWorkflow);
    setIsDraggingNewNode(null);
  };

  const handleTaskRemove = (nodeId: string) => {
    const updatedWorkflow = workflow
      .filter(task => task.id !== nodeId)
      .map(task => ({
        ...task,
        connections: task.connections.filter(conn => conn !== nodeId)
      }));
    handleWorkflowUpdate(updatedWorkflow);
    setSelectedTask(null);
  };

  const handleTaskPositionUpdate = (nodeId: string, newPosition: { x: number; y: number }) => {
    const updatedWorkflow = workflow.map(task => 
      task.id === nodeId ? { ...task, position: newPosition } : task
    );
   const sortedWorkflow = updatedWorkflow.sort((a, b) => {
    if (a.position.x === b.position.x) {
      return a.position.y - b.position.y;
    }
    return a.position.x - b.position.x; 
  });
    handleWorkflowUpdate(sortedWorkflow);
  };

  const validateWorkflow = (tasks: Task[]): Task[] => {
    return tasks;
  };

  const handleTaskCreate = (task: Task) => {
    handleWorkflowUpdate([...workflow, task]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full h-screen">
      <TaskList 
        tasks={tasks} 
        onDragStart={setIsDraggingNewTask}
        onTaskCreate={handleTaskCreate}
      />
      <WorkflowCanvas
        workflow={workflow}
        onWorkflowUpdate={handleWorkflowUpdate}
        onTaskDrop={handleTaskDrop}
        onTaskRemove={handleTaskRemove}
        onTaskPositionUpdate={handleTaskPositionUpdate}
        isDraggingNewTask={isDraggingNewTask}
        onTaskSelect={setSelectedTask}
        selectedTask={selectedTask}
      />
      <TaskExecutor workflow={workflow} />
    </div>
  );
}