import React from 'react';
import { Task } from '@/types';

interface Props {
  workflow: Task[];
}

export default function TaskExecutor({ workflow }: Props) {
  const executeWorkflow = async () => {
    for (const task of workflow) {
      await executeTask(task);
    }
  };

  const executeTask = async (task: Task) => {
    console.log(`Executing task: ${task.type}`, task.config);
  };

  return (
    <div className="flex-none w-64 w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold mb-4">Task Executor</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={executeWorkflow}
      >
        Execute Workflow
      </button>
    </div>
  );
}

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


import React from 'react';
import { NodeType } from '@/types';

interface Props {
  nodeTypes: NodeType[];
  onDragStart: (nodeType: NodeType) => void;
}

export default function NodeList({ nodeTypes, onDragStart }: Props) {
  const handleDragStart = (e: React.DragEvent, nodeType: NodeType) => {
    e.dataTransfer.setData('application/json', JSON.stringify(nodeType));
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(nodeType);
  };
  return (
    <div className="flex-none w-64 bg-white shadow-lg p-4 z-10">
      <h2 className="text-lg font-bold mb-4">Available Nodes</h2>
      <div className="space-y-2">
        {nodeTypes.map(nodeType => (
          <div
            key={nodeType.id}
            className="p-3 bg-gray-50 rounded cursor-move hover:bg-gray-100"
            draggable
            onDragStart={(e) => handleDragStart(e, nodeType)}
            onDragEnd={() => onDragStart(null)}
          >
            <span className="mr-2">{nodeType.icon}</span>
            {nodeType.label}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Task, NodeType } from '@/types';
import Xarrow, { Xwrapper } from 'react-xarrows';

interface Props {
  workflow: Task[];
  onWorkflowUpdate: (workflow: Task[]) => void;
  onNodeDrop: (position: { x: number; y: number }, nodeType?: NodeType) => void;
  isDraggingNewNode: NodeType | null;
  onNodeSelect: (node: Task) => void;
}

export default function WorkflowCanvas({ 
  workflow, 
  onWorkflowUpdate, 
  onNodeDrop,
  isDraggingNewNode,
  onNodeSelect,
  selectedNode 
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [connectingNode, setConnectingNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);

   const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left - 100,
      y: e.clientY - rect.top - 50
    };
    try {
      const nodeTypeData = e.dataTransfer.getData('application/json');
      if (nodeTypeData) {
        const nodeType = JSON.parse(nodeTypeData) as NodeType;
        onNodeDrop(position, nodeType);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isConnecting) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleConnectorStart = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingNode(nodeId);
    setIsConnecting(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isConnecting || !connectingNode) return;
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);

    const targetNodeElement = targetElement?.closest('[data-node-id]');

    const targetNodeId = targetNodeElement?.getAttribute('data-node-id');
    if (targetNodeId && targetNodeId !== connectingNode) {
      const updatedWorkflow = workflow.map(node => {
        if (node.id === connectingNode) {
          return {
            ...node,
            connections: [...node.connections, targetNodeId]
          };
        }
        return node;
      });
      onWorkflowUpdate(updatedWorkflow);
    }
    setIsConnecting(false);
    setConnectingNode(null);
  };

  const checkForCircularConnection = (
    workflow: Task[], 
    sourceId: string, 
    targetId: string, 
    visited: Set<string> = new Set()
  ): boolean => {
    if (visited.has(targetId)) return true;
    if (sourceId === targetId) return true;

    visited.add(targetId);
    const targetNode = workflow.find(node => node.id === targetId);
    
    if (!targetNode) return false;

    return targetNode.connections.some(connectionId =>
      checkForCircularConnection(workflow, sourceId, connectionId, new Set(visited))
    );
  };

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative overflow-hidden bg-gray-50"
      onDragOver={handleCanvasDragOver}
      onDrop={handleCanvasDrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDraggingNewNode ? 'copy' : 'default' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`border-2 border-dashed rounded-lg w-[800px] h-[600px] flex items-center justify-center
          ${isDraggingNewNode ? 'border-blue-300 bg-blue-50/20' : 'border-gray-300'}`}>
          {workflow.length === 0 && (
            <div className="text-gray-400 pointer-events-none">
              {isDraggingNewNode ? 'Drop node here' : 'Drag and drop nodes here'}
            </div>
          )}
        </div>
      </div>
      <Xwrapper>
        {workflow.map((node, index) => (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: node.position.x,
              top: node.position.y,
            }}
          >
            <div
              className={`relative bg-white rounded-lg shadow-md p-4 w-[200px] ${selectedNode?.id === node.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => onNodeSelect(node)}
            >
              {index > 0 && (
                <div
                  className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-crosshair hover:bg-blue-600 connection-handle"
                  data-connector-type="input"
                  data-node-id={node.id}
                />              
              )}

              <div className="font-bold mb-2">{node.type}</div>
              <div className="text-sm text-gray-600">
                {Object.entries(node.config).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
              {index < workflow.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-crosshair hover:bg-blue-600 connection-handle"
                  data-connector-type="output"
                  data-node-id={node.id}
                  onMouseDown={(e) => handleConnectorStart(e, node.id)}
                />
              )}
            </div>
          </div>
        ))}
        {workflow.map(node => 
          node.connections.map(targetId => (
            <Xarrow
              key={`${node.id}-${targetId}`}
              start={node.id}
              end={targetId}
              color="#4B5563"
              strokeWidth={2}
              path="smooth"
              startAnchor="right"
              endAnchor="left"
              curveness={0.8}
            />
          ))
        )}

        {isConnecting && connectingNode && (
          <Xarrow
            start={connectingNode}
            end={mousePosition}
            color="#93C5FD"
            strokeWidth={2}
            path="smooth"
            startAnchor="right"
            endAnchor="left"
            curveness={0.8}
            dashness={true}
          />
        )}
      </Xwrapper>
    </div>
  );
}

here make sure i can create/ remove a new task item at note list create directory with folder where i can create folder and add item list inside folder and add and remove folder as well 

note list should show the title, task details at canvas 


when i change position of the note in canvas it should update the index of the workflow if tehre are item on top of another the above is the previous index of the below 


there should be a browser interface at the left of canvas as well 


currently i can't connect the node so fix that as well 


