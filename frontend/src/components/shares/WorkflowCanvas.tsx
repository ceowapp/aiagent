"use client"
import React, { useRef, useState } from 'react';
import { Task } from '@/types';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { FaTrash } from 'react-icons/fa';

interface Props {
  workflow: Task[];
  onWorkflowUpdate: (workflow: Task[]) => void;
  onTaskDrop: (position: { x: number; y: number }, task?: Task) => void;
  onTaskRemove: (nodeId: string) => void;
  onTaskPositionUpdate: (nodeId: string, position: { x: number; y: number }) => void;
  isDraggingNewTask: Task | null;
  onTaskSelect: (task: Task) => void;
  selectedTask: Task | null;
}

export default function WorkflowCanvas({ 
  workflow, 
  onWorkflowUpdate, 
  onTaskDrop,
  onTaskRemove,
  onTaskPositionUpdate,
  isDraggingNewTask,
  onTaskSelect,
  selectedTask 
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [connectingNode, setConnectingNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [draggedNode, setDraggedNode] = useState<{ nodeId: string; offset: { x: number; y: number } } | null>(null);

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
        const task = JSON.parse(nodeTypeData) as task;
        onTaskDrop(position, task);
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

    if (draggedNode) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newPosition = {
          x: e.clientX - rect.left - draggedNode.offset.x,
          y: e.clientY - rect.top - draggedNode.offset.y
        };
        onTaskPositionUpdate(draggedNode.nodeId, newPosition);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isConnecting && connectingNode) {
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      const targetNodeElement = targetElement?.closest('[data-task-id]');
      const targetNodeId = targetNodeElement?.getAttribute('data-task-id');

      if (targetNodeId && targetNodeId !== connectingNode) {
        const updatedWorkflow = workflow.map(task => {
          if (task.id === connectingNode) {
            return {
              ...task,
              connections: [...task.connections, targetNodeId]
            };
          }
          return task;
        });
        onWorkflowUpdate(updatedWorkflow);
      }
      setIsConnecting(false);
      setConnectingNode(null);
    }

    setDraggedNode(null);
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setDraggedNode({ nodeId, offset });
  };

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative overflow-hidden bg-gray-50"
      onDragOver={handleCanvasDragOver}
      onDrop={handleCanvasDrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDraggingNewTask ? 'copy' : 'default' }}
    >
      <Xwrapper>
        {workflow.map((task) => (
          <div
            key={task.id}
            id={task.id}
            className="absolute"
            style={{
              left: task.position.x,
              top: task.position.y,
            }}
            data-task-id={task.id}
            onMouseDown={(e) => handleMouseDown(e, task.id)}
          >
            <div
              className={`relative bg-white rounded-lg shadow-md p-4 w-[200px] 
                ${selectedTask?.id === task.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => onTaskSelect(task)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">{task.type}</div>
                <button 
                  onClick={() => onTaskRemove(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                {Object.entries(task.config).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>

              <div
                className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-crosshair hover:bg-blue-600 connection-handle"
                data-connector-type="output"
                data-task-id={task.id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setConnectingNode(task.id);
                  setIsConnecting(true);
                }}
              />
            </div>
          </div>
        ))}

        {workflow.map(task => 
          task.connections.map(targetId => (
            <Xarrow
              key={`${task.id}-${targetId}`}
              start={task.id}
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