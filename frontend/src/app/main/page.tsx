"use client"
import React, { useState, useCallback } from 'react';
import WorkflowBuilder from '@/components/shares/WorkflowBuilder';
import { Task } from '@/types';

export default function Home() {
  const [workflow, setWorkflow] = useState<Task[]>([]);

  const onWorkflowUpdate = useCallback((newWorkflow: Task[]) => {
    const validatedWorkflow = validateWorkflow(newWorkflow);
    setWorkflow(validatedWorkflow);
  }, []);

  const validateWorkflow = (tasks: Task[]): Task[] => {
    const validTasks = tasks.map(task => {
      const validConnections = task.connections.filter(connectionId => {
        const wouldCreateCircular = checkCircularDependency(
          tasks,
          task.id,
          connectionId,
          new Set()
        );
        return !wouldCreateCircular;
      });

      return {
        ...task,
        connections: validConnections
      };
    });
    return sortTasksByDependency(validTasks);
  };

  const checkCircularDependency = (
    tasks: Task[],
    sourceId: string,
    targetId: string,
    visited: Set<string>
  ): boolean => {
    if (visited.has(targetId)) return true;
    if (sourceId === targetId) return true;

    visited.add(targetId);
    const targetNode = tasks.find(task => task.id === targetId);
    
    if (!targetNode) return false;

    return targetNode.connections.some(connectionId =>
      checkCircularDependency(tasks, sourceId, connectionId, new Set(visited))
    );
  };

  const sortTasksByDependency = (tasks: Task[]): Task[] => {
    const sorted: Task[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (taskId: string) => {
      if (visited.has(taskId)) return;
      if (visiting.has(taskId)) return;

      visiting.add(taskId);
      const task = tasks.find(t => t.id === taskId);
      
      if (task) {
        task.connections.forEach(connectionId => {
          visit(connectionId);
        });

        visiting.delete(taskId);
        visited.add(taskId);
        sorted.push(task);
      }
    };
    const startNodes = tasks.filter(task =>
      !tasks.some(t => t.connections.includes(task.id))
    );
    startNodes.forEach(task => visit(task.id));
    tasks.forEach(task => {
      if (!visited.has(task.id)) {
        sorted.push(task);
      }
    });

    return sorted;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <WorkflowBuilder 
        onWorkflowUpdate={onWorkflowUpdate} 
        workflow={workflow}
      />
    </div>
  );
}


