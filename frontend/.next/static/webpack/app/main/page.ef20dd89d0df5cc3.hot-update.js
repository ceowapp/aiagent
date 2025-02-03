"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/main/page",{

/***/ "(app-pages-browser)/./src/components/shares/WorkflowBuilder.tsx":
/*!***************************************************!*\
  !*** ./src/components/shares/WorkflowBuilder.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ WorkflowBuilder; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ \"(app-pages-browser)/./node_modules/uuid/dist/esm-browser/v4.js\");\n/* harmony import */ var _hooks_useTasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/hooks/useTasks */ \"(app-pages-browser)/./src/hooks/useTasks.ts\");\n/* harmony import */ var _TaskList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskList */ \"(app-pages-browser)/./src/components/shares/TaskList.tsx\");\n/* harmony import */ var _WorkflowCanvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WorkflowCanvas */ \"(app-pages-browser)/./src/components/shares/WorkflowCanvas.tsx\");\n/* harmony import */ var _TaskExecutor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TaskExecutor */ \"(app-pages-browser)/./src/components/shares/TaskExecutor.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction WorkflowBuilder() {\n    _s();\n    const { data: tasks, isLoading, error } = (0,_hooks_useTasks__WEBPACK_IMPORTED_MODULE_2__.useTasks)();\n    const [workflow, setWorkflow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [folders, setFolders] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(),\n            name: \"Default Folder\",\n            tasks: []\n        }\n    ]);\n    const [selectedNode, setSelectedNode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isDraggingNewNode, setIsDraggingNewNode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleWorkflowUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((newWorkflow)=>{\n        const validatedWorkflow = validateWorkflow(newWorkflow);\n        setWorkflow(validatedWorkflow);\n    }, []);\n    const handleTaskDrop = (position, task)=>{\n        if (!task) return;\n        const newNode = {\n            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(),\n            type: task.id,\n            title: \"New \".concat(task.title),\n            details: \"\",\n            position,\n            connections: [],\n            config: {\n                ...task.defaultConfig\n            }\n        };\n        const updatedWorkflow = [\n            ...workflow,\n            newNode\n        ];\n        handleWorkflowUpdate(updatedWorkflow);\n        setIsDraggingNewNode(null);\n    };\n    const handleNodeRemove = (nodeId)=>{\n        const updatedWorkflow = workflow.filter((task)=>task.id !== nodeId).map((task)=>({\n                ...task,\n                connections: task.connections.filter((conn)=>conn !== nodeId)\n            }));\n        handleWorkflowUpdate(updatedWorkflow);\n        setSelectedNode(null);\n    };\n    const handleNodePositionUpdate = (nodeId, newPosition)=>{\n        const updatedWorkflow = workflow.map((task)=>task.id === nodeId ? {\n                ...task,\n                position: newPosition\n            } : task);\n        const sortedWorkflow = updatedWorkflow.sort((a, b)=>{\n            if (a.position.x === b.position.x) {\n                return a.position.y - b.position.y;\n            }\n            return a.position.x - b.position.x;\n        });\n        handleWorkflowUpdate(sortedWorkflow);\n    };\n    const validateWorkflow = (tasks)=>{\n        return tasks;\n    };\n    const handleTaskCreate = (task)=>{\n        handleWorkflowUpdate([\n            ...workflow,\n            task\n        ]);\n    };\n    if (isLoading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\DELL\\\\Omnibus\\\\aiagent\\\\frontend\\\\src\\\\components\\\\shares\\\\WorkflowBuilder.tsx\",\n        lineNumber: 72,\n        columnNumber: 25\n    }, this);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            \"Error: \",\n            error.message\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\DELL\\\\Omnibus\\\\aiagent\\\\frontend\\\\src\\\\components\\\\shares\\\\WorkflowBuilder.tsx\",\n        lineNumber: 73,\n        columnNumber: 21\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex w-full h-screen\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_TaskList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                tasks: tasks,\n                onDragStart: setIsDraggingNewNode,\n                onTaskCreate: handleTaskCreate\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\DELL\\\\Omnibus\\\\aiagent\\\\frontend\\\\src\\\\components\\\\shares\\\\WorkflowBuilder.tsx\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_WorkflowCanvas__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                workflow: workflow,\n                onWorkflowUpdate: handleWorkflowUpdate,\n                onTaskDrop: handleTaskDrop,\n                onNodeRemove: handleNodeRemove,\n                onNodePositionUpdate: handleNodePositionUpdate,\n                isDraggingNewNode: isDraggingNewNode,\n                onNodeSelect: setSelectedNode,\n                selectedNode: selectedNode\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\DELL\\\\Omnibus\\\\aiagent\\\\frontend\\\\src\\\\components\\\\shares\\\\WorkflowBuilder.tsx\",\n                lineNumber: 82,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_TaskExecutor__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                workflow: workflow\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\DELL\\\\Omnibus\\\\aiagent\\\\frontend\\\\src\\\\components\\\\shares\\\\WorkflowBuilder.tsx\",\n                lineNumber: 92,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\DELL\\\\Omnibus\\\\aiagent\\\\frontend\\\\src\\\\components\\\\shares\\\\WorkflowBuilder.tsx\",\n        lineNumber: 76,\n        columnNumber: 5\n    }, this);\n}\n_s(WorkflowBuilder, \"zpB/IwskJThVjQGMgIcuBKtpa0s=\", false, function() {\n    return [\n        _hooks_useTasks__WEBPACK_IMPORTED_MODULE_2__.useTasks\n    ];\n});\n_c = WorkflowBuilder;\nvar _c;\n$RefreshReg$(_c, \"WorkflowBuilder\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3NoYXJlcy9Xb3JrZmxvd0J1aWxkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ3FEO0FBQ2pCO0FBQ1E7QUFDVjtBQUNZO0FBQ0o7QUFHM0IsU0FBU1M7O0lBQ3RCLE1BQU0sRUFBRUMsTUFBTUMsS0FBSyxFQUFFQyxTQUFTLEVBQUVDLEtBQUssRUFBRSxHQUFHUix5REFBUUE7SUFDbEQsTUFBTSxDQUFDUyxVQUFVQyxZQUFZLEdBQUdkLCtDQUFRQSxDQUFTLEVBQUU7SUFDbkQsTUFBTSxDQUFDZSxTQUFTQyxXQUFXLEdBQUdoQiwrQ0FBUUEsQ0FBVztRQUMvQztZQUFFaUIsSUFBSWQsZ0RBQU1BO1lBQUllLE1BQU07WUFBa0JSLE9BQU8sRUFBRTtRQUFDO0tBQ25EO0lBQ0QsTUFBTSxDQUFDUyxjQUFjQyxnQkFBZ0IsR0FBR3BCLCtDQUFRQSxDQUFjO0lBQzlELE1BQU0sQ0FBQ3FCLG1CQUFtQkMscUJBQXFCLEdBQUd0QiwrQ0FBUUEsQ0FBYztJQUV4RSxNQUFNdUIsdUJBQXVCdEIsa0RBQVdBLENBQUMsQ0FBQ3VCO1FBQ3hDLE1BQU1DLG9CQUFvQkMsaUJBQWlCRjtRQUMzQ1YsWUFBWVc7SUFDZCxHQUFHLEVBQUU7SUFFTCxNQUFNRSxpQkFBaUIsQ0FBQ0MsVUFBb0NDO1FBQzFELElBQUksQ0FBQ0EsTUFBTTtRQUNYLE1BQU1DLFVBQWdCO1lBQ3BCYixJQUFJZCxnREFBTUE7WUFDVjRCLE1BQU1GLEtBQUtaLEVBQUU7WUFDYmUsT0FBTyxPQUFrQixPQUFYSCxLQUFLRyxLQUFLO1lBQ3hCQyxTQUFTO1lBQ1RMO1lBQ0FNLGFBQWEsRUFBRTtZQUNmQyxRQUFRO2dCQUFFLEdBQUdOLEtBQUtPLGFBQWE7WUFBQztRQUNsQztRQUNBLE1BQU1DLGtCQUFrQjtlQUFJeEI7WUFBVWlCO1NBQVE7UUFDOUNQLHFCQUFxQmM7UUFDckJmLHFCQUFxQjtJQUN2QjtJQUVBLE1BQU1nQixtQkFBbUIsQ0FBQ0M7UUFDeEIsTUFBTUYsa0JBQWtCeEIsU0FDckIyQixNQUFNLENBQUNYLENBQUFBLE9BQVFBLEtBQUtaLEVBQUUsS0FBS3NCLFFBQzNCRSxHQUFHLENBQUNaLENBQUFBLE9BQVM7Z0JBQ1osR0FBR0EsSUFBSTtnQkFDUEssYUFBYUwsS0FBS0ssV0FBVyxDQUFDTSxNQUFNLENBQUNFLENBQUFBLE9BQVFBLFNBQVNIO1lBQ3hEO1FBQ0ZoQixxQkFBcUJjO1FBQ3JCakIsZ0JBQWdCO0lBQ2xCO0lBRUEsTUFBTXVCLDJCQUEyQixDQUFDSixRQUFnQks7UUFDaEQsTUFBTVAsa0JBQWtCeEIsU0FBUzRCLEdBQUcsQ0FBQ1osQ0FBQUEsT0FDbkNBLEtBQUtaLEVBQUUsS0FBS3NCLFNBQVM7Z0JBQUUsR0FBR1YsSUFBSTtnQkFBRUQsVUFBVWdCO1lBQVksSUFBSWY7UUFFN0QsTUFBTWdCLGlCQUFpQlIsZ0JBQWdCUyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0M7WUFDL0MsSUFBSUQsRUFBRW5CLFFBQVEsQ0FBQ3FCLENBQUMsS0FBS0QsRUFBRXBCLFFBQVEsQ0FBQ3FCLENBQUMsRUFBRTtnQkFDakMsT0FBT0YsRUFBRW5CLFFBQVEsQ0FBQ3NCLENBQUMsR0FBR0YsRUFBRXBCLFFBQVEsQ0FBQ3NCLENBQUM7WUFDcEM7WUFDQSxPQUFPSCxFQUFFbkIsUUFBUSxDQUFDcUIsQ0FBQyxHQUFHRCxFQUFFcEIsUUFBUSxDQUFDcUIsQ0FBQztRQUNwQztRQUNFMUIscUJBQXFCc0I7SUFDdkI7SUFFQSxNQUFNbkIsbUJBQW1CLENBQUNoQjtRQUN4QixPQUFPQTtJQUNUO0lBRUEsTUFBTXlDLG1CQUFtQixDQUFDdEI7UUFDeEJOLHFCQUFxQjtlQUFJVjtZQUFVZ0I7U0FBSztJQUMxQztJQUVBLElBQUlsQixXQUFXLHFCQUFPLDhEQUFDeUM7a0JBQUk7Ozs7OztJQUMzQixJQUFJeEMsT0FBTyxxQkFBTyw4REFBQ3dDOztZQUFJO1lBQVF4QyxNQUFNeUMsT0FBTzs7Ozs7OztJQUU1QyxxQkFDRSw4REFBQ0Q7UUFBSUUsV0FBVTs7MEJBQ2IsOERBQUNqRCxpREFBUUE7Z0JBQ1BLLE9BQU9BO2dCQUNQNkMsYUFBYWpDO2dCQUNia0MsY0FBY0w7Ozs7OzswQkFFaEIsOERBQUM3Qyx1REFBY0E7Z0JBQ2JPLFVBQVVBO2dCQUNWNEMsa0JBQWtCbEM7Z0JBQ2xCbUMsWUFBWS9CO2dCQUNaZ0MsY0FBY3JCO2dCQUNkc0Isc0JBQXNCakI7Z0JBQ3RCdEIsbUJBQW1CQTtnQkFDbkJ3QyxjQUFjekM7Z0JBQ2RELGNBQWNBOzs7Ozs7MEJBRWhCLDhEQUFDWixxREFBWUE7Z0JBQUNNLFVBQVVBOzs7Ozs7Ozs7Ozs7QUFHOUI7R0FyRndCTDs7UUFDb0JKLHFEQUFRQTs7O0tBRDVCSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9zaGFyZXMvV29ya2Zsb3dCdWlsZGVyLnRzeD9iMmNkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyB1c2VUYXNrcyB9IGZyb20gJ0AvaG9va3MvdXNlVGFza3MnO1xuaW1wb3J0IFRhc2tMaXN0IGZyb20gJy4vVGFza0xpc3QnO1xuaW1wb3J0IFdvcmtmbG93Q2FudmFzIGZyb20gJy4vV29ya2Zsb3dDYW52YXMnO1xuaW1wb3J0IFRhc2tFeGVjdXRvciBmcm9tICcuL1Rhc2tFeGVjdXRvcic7XG5pbXBvcnQgeyBUYXNrLCBGb2xkZXIgfSBmcm9tICdAL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV29ya2Zsb3dCdWlsZGVyKCkge1xuICBjb25zdCB7IGRhdGE6IHRhc2tzLCBpc0xvYWRpbmcsIGVycm9yIH0gPSB1c2VUYXNrcygpO1xuICBjb25zdCBbd29ya2Zsb3csIHNldFdvcmtmbG93XSA9IHVzZVN0YXRlPFRhc2tbXT4oW10pO1xuICBjb25zdCBbZm9sZGVycywgc2V0Rm9sZGVyc10gPSB1c2VTdGF0ZTxGb2xkZXJbXT4oW1xuICAgIHsgaWQ6IHV1aWR2NCgpLCBuYW1lOiAnRGVmYXVsdCBGb2xkZXInLCB0YXNrczogW10gfVxuICBdKTtcbiAgY29uc3QgW3NlbGVjdGVkTm9kZSwgc2V0U2VsZWN0ZWROb2RlXSA9IHVzZVN0YXRlPFRhc2sgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzRHJhZ2dpbmdOZXdOb2RlLCBzZXRJc0RyYWdnaW5nTmV3Tm9kZV0gPSB1c2VTdGF0ZTxUYXNrIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlV29ya2Zsb3dVcGRhdGUgPSB1c2VDYWxsYmFjaygobmV3V29ya2Zsb3c6IFRhc2tbXSkgPT4ge1xuICAgIGNvbnN0IHZhbGlkYXRlZFdvcmtmbG93ID0gdmFsaWRhdGVXb3JrZmxvdyhuZXdXb3JrZmxvdyk7XG4gICAgc2V0V29ya2Zsb3codmFsaWRhdGVkV29ya2Zsb3cpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlVGFza0Ryb3AgPSAocG9zaXRpb246IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSwgdGFzaz86IFRhc2spID0+IHtcbiAgICBpZiAoIXRhc2spIHJldHVybjtcbiAgICBjb25zdCBuZXdOb2RlOiBUYXNrID0ge1xuICAgICAgaWQ6IHV1aWR2NCgpLFxuICAgICAgdHlwZTogdGFzay5pZCxcbiAgICAgIHRpdGxlOiBgTmV3ICR7dGFzay50aXRsZX1gLFxuICAgICAgZGV0YWlsczogJycsXG4gICAgICBwb3NpdGlvbixcbiAgICAgIGNvbm5lY3Rpb25zOiBbXSxcbiAgICAgIGNvbmZpZzogeyAuLi50YXNrLmRlZmF1bHRDb25maWcgfVxuICAgIH07XG4gICAgY29uc3QgdXBkYXRlZFdvcmtmbG93ID0gWy4uLndvcmtmbG93LCBuZXdOb2RlXTtcbiAgICBoYW5kbGVXb3JrZmxvd1VwZGF0ZSh1cGRhdGVkV29ya2Zsb3cpO1xuICAgIHNldElzRHJhZ2dpbmdOZXdOb2RlKG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU5vZGVSZW1vdmUgPSAobm9kZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB1cGRhdGVkV29ya2Zsb3cgPSB3b3JrZmxvd1xuICAgICAgLmZpbHRlcih0YXNrID0+IHRhc2suaWQgIT09IG5vZGVJZClcbiAgICAgIC5tYXAodGFzayA9PiAoe1xuICAgICAgICAuLi50YXNrLFxuICAgICAgICBjb25uZWN0aW9uczogdGFzay5jb25uZWN0aW9ucy5maWx0ZXIoY29ubiA9PiBjb25uICE9PSBub2RlSWQpXG4gICAgICB9KSk7XG4gICAgaGFuZGxlV29ya2Zsb3dVcGRhdGUodXBkYXRlZFdvcmtmbG93KTtcbiAgICBzZXRTZWxlY3RlZE5vZGUobnVsbCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTm9kZVBvc2l0aW9uVXBkYXRlID0gKG5vZGVJZDogc3RyaW5nLCBuZXdQb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZFdvcmtmbG93ID0gd29ya2Zsb3cubWFwKHRhc2sgPT4gXG4gICAgICB0YXNrLmlkID09PSBub2RlSWQgPyB7IC4uLnRhc2ssIHBvc2l0aW9uOiBuZXdQb3NpdGlvbiB9IDogdGFza1xuICAgICk7XG4gICBjb25zdCBzb3J0ZWRXb3JrZmxvdyA9IHVwZGF0ZWRXb3JrZmxvdy5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEucG9zaXRpb24ueCA9PT0gYi5wb3NpdGlvbi54KSB7XG4gICAgICByZXR1cm4gYS5wb3NpdGlvbi55IC0gYi5wb3NpdGlvbi55O1xuICAgIH1cbiAgICByZXR1cm4gYS5wb3NpdGlvbi54IC0gYi5wb3NpdGlvbi54OyBcbiAgfSk7XG4gICAgaGFuZGxlV29ya2Zsb3dVcGRhdGUoc29ydGVkV29ya2Zsb3cpO1xuICB9O1xuXG4gIGNvbnN0IHZhbGlkYXRlV29ya2Zsb3cgPSAodGFza3M6IFRhc2tbXSk6IFRhc2tbXSA9PiB7XG4gICAgcmV0dXJuIHRhc2tzO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRhc2tDcmVhdGUgPSAodGFzazogVGFzaykgPT4ge1xuICAgIGhhbmRsZVdvcmtmbG93VXBkYXRlKFsuLi53b3JrZmxvdywgdGFza10pO1xuICB9O1xuXG4gIGlmIChpc0xvYWRpbmcpIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XG4gIGlmIChlcnJvcikgcmV0dXJuIDxkaXY+RXJyb3I6IHtlcnJvci5tZXNzYWdlfTwvZGl2PjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwgaC1zY3JlZW5cIj5cbiAgICAgIDxUYXNrTGlzdCBcbiAgICAgICAgdGFza3M9e3Rhc2tzfSBcbiAgICAgICAgb25EcmFnU3RhcnQ9e3NldElzRHJhZ2dpbmdOZXdOb2RlfVxuICAgICAgICBvblRhc2tDcmVhdGU9e2hhbmRsZVRhc2tDcmVhdGV9XG4gICAgICAvPlxuICAgICAgPFdvcmtmbG93Q2FudmFzXG4gICAgICAgIHdvcmtmbG93PXt3b3JrZmxvd31cbiAgICAgICAgb25Xb3JrZmxvd1VwZGF0ZT17aGFuZGxlV29ya2Zsb3dVcGRhdGV9XG4gICAgICAgIG9uVGFza0Ryb3A9e2hhbmRsZVRhc2tEcm9wfVxuICAgICAgICBvbk5vZGVSZW1vdmU9e2hhbmRsZU5vZGVSZW1vdmV9XG4gICAgICAgIG9uTm9kZVBvc2l0aW9uVXBkYXRlPXtoYW5kbGVOb2RlUG9zaXRpb25VcGRhdGV9XG4gICAgICAgIGlzRHJhZ2dpbmdOZXdOb2RlPXtpc0RyYWdnaW5nTmV3Tm9kZX1cbiAgICAgICAgb25Ob2RlU2VsZWN0PXtzZXRTZWxlY3RlZE5vZGV9XG4gICAgICAgIHNlbGVjdGVkTm9kZT17c2VsZWN0ZWROb2RlfVxuICAgICAgLz5cbiAgICAgIDxUYXNrRXhlY3V0b3Igd29ya2Zsb3c9e3dvcmtmbG93fSAvPlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlQ2FsbGJhY2siLCJ2NCIsInV1aWR2NCIsInVzZVRhc2tzIiwiVGFza0xpc3QiLCJXb3JrZmxvd0NhbnZhcyIsIlRhc2tFeGVjdXRvciIsIldvcmtmbG93QnVpbGRlciIsImRhdGEiLCJ0YXNrcyIsImlzTG9hZGluZyIsImVycm9yIiwid29ya2Zsb3ciLCJzZXRXb3JrZmxvdyIsImZvbGRlcnMiLCJzZXRGb2xkZXJzIiwiaWQiLCJuYW1lIiwic2VsZWN0ZWROb2RlIiwic2V0U2VsZWN0ZWROb2RlIiwiaXNEcmFnZ2luZ05ld05vZGUiLCJzZXRJc0RyYWdnaW5nTmV3Tm9kZSIsImhhbmRsZVdvcmtmbG93VXBkYXRlIiwibmV3V29ya2Zsb3ciLCJ2YWxpZGF0ZWRXb3JrZmxvdyIsInZhbGlkYXRlV29ya2Zsb3ciLCJoYW5kbGVUYXNrRHJvcCIsInBvc2l0aW9uIiwidGFzayIsIm5ld05vZGUiLCJ0eXBlIiwidGl0bGUiLCJkZXRhaWxzIiwiY29ubmVjdGlvbnMiLCJjb25maWciLCJkZWZhdWx0Q29uZmlnIiwidXBkYXRlZFdvcmtmbG93IiwiaGFuZGxlTm9kZVJlbW92ZSIsIm5vZGVJZCIsImZpbHRlciIsIm1hcCIsImNvbm4iLCJoYW5kbGVOb2RlUG9zaXRpb25VcGRhdGUiLCJuZXdQb3NpdGlvbiIsInNvcnRlZFdvcmtmbG93Iiwic29ydCIsImEiLCJiIiwieCIsInkiLCJoYW5kbGVUYXNrQ3JlYXRlIiwiZGl2IiwibWVzc2FnZSIsImNsYXNzTmFtZSIsIm9uRHJhZ1N0YXJ0Iiwib25UYXNrQ3JlYXRlIiwib25Xb3JrZmxvd1VwZGF0ZSIsIm9uVGFza0Ryb3AiLCJvbk5vZGVSZW1vdmUiLCJvbk5vZGVQb3NpdGlvblVwZGF0ZSIsIm9uTm9kZVNlbGVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/shares/WorkflowBuilder.tsx\n"));

/***/ })

});