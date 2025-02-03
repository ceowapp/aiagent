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

/***/ "(app-pages-browser)/./src/hooks/useTasks.ts":
/*!*******************************!*\
  !*** ./src/hooks/useTasks.ts ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCreateFolder: function() { return /* binding */ useCreateFolder; },\n/* harmony export */   useCreateTask: function() { return /* binding */ useCreateTask; },\n/* harmony export */   useDeleteFolder: function() { return /* binding */ useDeleteFolder; },\n/* harmony export */   useDuplicateFolder: function() { return /* binding */ useDuplicateFolder; },\n/* harmony export */   useFolder: function() { return /* binding */ useFolder; },\n/* harmony export */   useFolders: function() { return /* binding */ useFolders; },\n/* harmony export */   useTasks: function() { return /* binding */ useTasks; },\n/* harmony export */   useUpdateFolder: function() { return /* binding */ useUpdateFolder; },\n/* harmony export */   useUpdateTask: function() { return /* binding */ useUpdateTask; },\n/* harmony export */   useUpdateTaskPosition: function() { return /* binding */ useUpdateTaskPosition; }\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/useQuery.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/useMutation.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api */ \"(app-pages-browser)/./src/api/index.ts\");\n\n\nconst QUERY_KEYS = {\n    FOLDERS: \"folders\",\n    TASKS: \"tasks\"\n};\nconst queryKeys = {\n    folders: {\n        all: [\n            QUERY_KEYS.FOLDERS\n        ],\n        byId: (id)=>[\n                QUERY_KEYS.FOLDERS,\n                id\n            ]\n    },\n    tasks: {\n        all: [\n            QUERY_KEYS.TASKS\n        ]\n    }\n};\nfunction useFolders() {\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({\n        queryKey: queryKeys.folders.all,\n        queryFn: ()=>_api__WEBPACK_IMPORTED_MODULE_0__.api.getFolders(),\n        staleTime: 30000,\n        retry: 2\n    });\n}\nfunction useTasks() {\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({\n        queryKey: queryKeys.tasks.all,\n        queryFn: ()=>_api__WEBPACK_IMPORTED_MODULE_0__.api.getTasks(),\n        staleTime: 30000,\n        retry: 2\n    });\n}\nfunction useFolder(id) {\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({\n        queryKey: queryKeys.folders.byId(id),\n        queryFn: ()=>_api__WEBPACK_IMPORTED_MODULE_0__.api.getFolder(id),\n        enabled: !!id,\n        staleTime: 30000\n    });\n}\nfunction useCreateFolder() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (folder)=>_api__WEBPACK_IMPORTED_MODULE_0__.api.createFolder(folder),\n        onSuccess: (newFolder)=>{\n            queryClient.invalidateQueries({\n                queryKey: queryKeys.folders.all\n            });\n            queryClient.setQueryData(queryKeys.folders.all, (old)=>old ? [\n                    ...old,\n                    newFolder\n                ] : [\n                    newFolder\n                ]);\n        },\n        onError: (error)=>{\n            console.error(\"Failed to create folder:\", error);\n        }\n    });\n}\nfunction useUpdateFolder() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (param)=>{\n            let { id, updates } = param;\n            return _api__WEBPACK_IMPORTED_MODULE_0__.api.updateFolder(id, updates);\n        },\n        onMutate: async (param)=>{\n            let { id, updates } = param;\n            await queryClient.cancelQueries({\n                queryKey: queryKeys.folders.byId(id)\n            });\n            const previousFolder = queryClient.getQueryData(queryKeys.folders.byId(id));\n            queryClient.setQueryData(queryKeys.folders.byId(id), (old)=>old ? {\n                    ...old,\n                    ...updates\n                } : undefined);\n            return {\n                previousFolder\n            };\n        },\n        onError: (err, variables, context)=>{\n            if (context === null || context === void 0 ? void 0 : context.previousFolder) {\n                queryClient.setQueryData(queryKeys.folders.byId(variables.id), context.previousFolder);\n            }\n        },\n        onSettled: (folder)=>{\n            if (folder) {\n                queryClient.invalidateQueries({\n                    queryKey: queryKeys.folders.all\n                });\n                queryClient.invalidateQueries({\n                    queryKey: queryKeys.folders.byId(folder.id)\n                });\n            }\n        }\n    });\n}\nfunction useUpdateTask() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (param)=>{\n            let { id, updates } = param;\n            return _api__WEBPACK_IMPORTED_MODULE_0__.api.updateTask(id, updates);\n        },\n        onMutate: async (param)=>{\n            let { id, updates } = param;\n            await queryClient.cancelQueries({\n                queryKey: queryKeys.tasks.byId(id)\n            });\n            const previousTask = queryClient.getQueryData(queryKeys.tasks.byId(id));\n            queryClient.setQueryData(queryKeys.tasks.byId(id), (old)=>old ? {\n                    ...old,\n                    ...updates\n                } : undefined);\n            return {\n                previousTask\n            };\n        },\n        onError: (err, variables, context)=>{\n            if (context === null || context === void 0 ? void 0 : context.previousTask) {\n                queryClient.setQueryData(queryKeys.tasks.byId(variables.id), context.previousTask);\n            }\n        },\n        onSettled: (folder)=>{\n            if (folder) {\n                queryClient.invalidateQueries({\n                    queryKey: queryKeys.tasks.all\n                });\n                queryClient.invalidateQueries({\n                    queryKey: queryKeys.tasks.byId(folder.id)\n                });\n            }\n        }\n    });\n}\nfunction useCreateTask() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (task)=>_api__WEBPACK_IMPORTED_MODULE_0__.api.createTask(task),\n        onMutate: async (newTask)=>{\n            await queryClient.cancelQueries({\n                queryKey: newTask.folderId ? queryKeys.folders.byId(newTask.folderId) : queryKeys.tasks.all\n            });\n            const previousFolderData = newTask.folderId ? queryClient.getQueryData(queryKeys.folders.byId(newTask.folderId)) : null;\n            if (newTask.folderId) {\n                queryClient.setQueryData(queryKeys.folders.byId(newTask.folderId), (old)=>{\n                    if (!old) return old;\n                    return {\n                        ...old,\n                        tasks: [\n                            ...old.tasks,\n                            {\n                                ...newTask,\n                                id: \"temp-id\"\n                            }\n                        ]\n                    };\n                });\n            }\n            return {\n                previousFolderData\n            };\n        },\n        onSuccess: (task)=>{\n            if (task.folderId) {\n                queryClient.invalidateQueries({\n                    queryKey: queryKeys.folders.byId(task.folderId)\n                });\n            }\n            queryClient.refetchQueries({\n                queryKey: queryKeys.tasks.all\n            });\n        },\n        onError: (error, newTask, context)=>{\n            if (newTask.folderId && (context === null || context === void 0 ? void 0 : context.previousFolderData)) {\n                queryClient.setQueryData(queryKeys.folders.byId(newTask.folderId), context.previousFolderData);\n            }\n            console.error(\"Failed to create task:\", error);\n        }\n    });\n}\nfunction useUpdateTaskPosition() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (param)=>{\n            let { id, position } = param;\n            return _api__WEBPACK_IMPORTED_MODULE_0__.api.updateTaskPosition(id, position);\n        },\n        onSuccess: (task)=>{\n            if (task === null || task === void 0 ? void 0 : task.folderId) {\n                queryClient.invalidateQueries({\n                    queryKey: queryKeys.folders.byId(task.folderId)\n                });\n            }\n        }\n    });\n}\nfunction useDeleteFolder() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (id)=>_api__WEBPACK_IMPORTED_MODULE_0__.api.deleteFolder(id),\n        onMutate: async (id)=>{\n            await queryClient.cancelQueries({\n                queryKey: queryKeys.folders.all\n            });\n            const previousFolders = queryClient.getQueryData(queryKeys.folders.all);\n            queryClient.setQueryData(queryKeys.folders.all, (old)=>old === null || old === void 0 ? void 0 : old.filter((folder)=>folder.id !== id));\n            return {\n                previousFolders\n            };\n        },\n        onError: (err, id, context)=>{\n            if (context === null || context === void 0 ? void 0 : context.previousFolders) {\n                queryClient.setQueryData(queryKeys.folders.all, context.previousFolders);\n            }\n        },\n        onSettled: ()=>{\n            queryClient.invalidateQueries({\n                queryKey: queryKeys.folders.all\n            });\n        }\n    });\n}\nfunction useDuplicateFolder() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: (id)=>_api__WEBPACK_IMPORTED_MODULE_0__.api.duplicateFolder(id),\n        onSuccess: (newFolder)=>{\n            queryClient.invalidateQueries({\n                queryKey: queryKeys.folders.all\n            });\n            queryClient.setQueryData(queryKeys.folders.all, (old)=>old ? [\n                    ...old,\n                    newFolder\n                ] : [\n                    newFolder\n                ]);\n        },\n        onError: (error)=>{\n            console.error(\"Failed to duplicate folder:\", error);\n        }\n    });\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VUYXNrcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4RTtBQUNsRDtBQUc1QixNQUFNSSxhQUFhO0lBQ2pCQyxTQUFTO0lBQ1RDLE9BQU87QUFDVDtBQUVBLE1BQU1DLFlBQVk7SUFDaEJDLFNBQVM7UUFDUEMsS0FBSztZQUFDTCxXQUFXQyxPQUFPO1NBQUM7UUFDekJLLE1BQU0sQ0FBQ0MsS0FBZTtnQkFBQ1AsV0FBV0MsT0FBTztnQkFBRU07YUFBRztJQUNoRDtJQUNBQyxPQUFPO1FBQ0xILEtBQUs7WUFBQ0wsV0FBV0UsS0FBSztTQUFDO0lBQ3pCO0FBQ0Y7QUFFTyxTQUFTTztJQUNkLE9BQU9iLCtEQUFRQSxDQUFDO1FBQ2RjLFVBQVVQLFVBQVVDLE9BQU8sQ0FBQ0MsR0FBRztRQUMvQk0sU0FBUyxJQUFNWixxQ0FBR0EsQ0FBQ2EsVUFBVTtRQUM3QkMsV0FBVztRQUNYQyxPQUFPO0lBQ1Q7QUFDRjtBQUVPLFNBQVNDO0lBQ2QsT0FBT25CLCtEQUFRQSxDQUFDO1FBQ2RjLFVBQVVQLFVBQVVLLEtBQUssQ0FBQ0gsR0FBRztRQUM3Qk0sU0FBUyxJQUFNWixxQ0FBR0EsQ0FBQ2lCLFFBQVE7UUFDM0JILFdBQVc7UUFDWEMsT0FBTztJQUNUO0FBQ0Y7QUFFTyxTQUFTRyxVQUFVVixFQUFVO0lBQ2xDLE9BQU9YLCtEQUFRQSxDQUFDO1FBQ2RjLFVBQVVQLFVBQVVDLE9BQU8sQ0FBQ0UsSUFBSSxDQUFDQztRQUNqQ0ksU0FBUyxJQUFNWixxQ0FBR0EsQ0FBQ21CLFNBQVMsQ0FBQ1g7UUFDN0JZLFNBQVMsQ0FBQyxDQUFDWjtRQUNYTSxXQUFXO0lBQ2I7QUFDRjtBQUVPLFNBQVNPO0lBQ2QsTUFBTUMsY0FBY3ZCLHFFQUFjQTtJQUVsQyxPQUFPRCxrRUFBV0EsQ0FBQztRQUNqQnlCLFlBQVksQ0FBQ0MsU0FBNEJ4QixxQ0FBR0EsQ0FBQ3lCLFlBQVksQ0FBQ0Q7UUFDMURFLFdBQVcs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Q0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2hvb2tzL3VzZVRhc2tzLnRzPzQxNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUXVlcnksIHVzZU11dGF0aW9uLCB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAL2FwaSc7XG5pbXBvcnQgeyBUYXNrLCBGb2xkZXIgfSBmcm9tICdAL3R5cGVzL3Rhc2snO1xuXG5jb25zdCBRVUVSWV9LRVlTID0ge1xuICBGT0xERVJTOiAnZm9sZGVycycsXG4gIFRBU0tTOiAndGFza3MnLFxufSBhcyBjb25zdDtcblxuY29uc3QgcXVlcnlLZXlzID0ge1xuICBmb2xkZXJzOiB7XG4gICAgYWxsOiBbUVVFUllfS0VZUy5GT0xERVJTXSBhcyBjb25zdCxcbiAgICBieUlkOiAoaWQ6IG51bWJlcikgPT4gW1FVRVJZX0tFWVMuRk9MREVSUywgaWRdIGFzIGNvbnN0LFxuICB9LFxuICB0YXNrczoge1xuICAgIGFsbDogW1FVRVJZX0tFWVMuVEFTS1NdIGFzIGNvbnN0LFxuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvbGRlcnMoKSB7XG4gIHJldHVybiB1c2VRdWVyeSh7XG4gICAgcXVlcnlLZXk6IHF1ZXJ5S2V5cy5mb2xkZXJzLmFsbCxcbiAgICBxdWVyeUZuOiAoKSA9PiBhcGkuZ2V0Rm9sZGVycygpLFxuICAgIHN0YWxlVGltZTogMzAwMDAsXG4gICAgcmV0cnk6IDIsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFza3MoKSB7XG4gIHJldHVybiB1c2VRdWVyeSh7XG4gICAgcXVlcnlLZXk6IHF1ZXJ5S2V5cy50YXNrcy5hbGwsXG4gICAgcXVlcnlGbjogKCkgPT4gYXBpLmdldFRhc2tzKCksXG4gICAgc3RhbGVUaW1lOiAzMDAwMCxcbiAgICByZXRyeTogMixcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb2xkZXIoaWQ6IG51bWJlcikge1xuICByZXR1cm4gdXNlUXVlcnkoe1xuICAgIHF1ZXJ5S2V5OiBxdWVyeUtleXMuZm9sZGVycy5ieUlkKGlkKSxcbiAgICBxdWVyeUZuOiAoKSA9PiBhcGkuZ2V0Rm9sZGVyKGlkKSxcbiAgICBlbmFibGVkOiAhIWlkLFxuICAgIHN0YWxlVGltZTogMzAwMDAsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQ3JlYXRlRm9sZGVyKCkge1xuICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG5cbiAgcmV0dXJuIHVzZU11dGF0aW9uKHtcbiAgICBtdXRhdGlvbkZuOiAoZm9sZGVyOiBQYXJ0aWFsPEZvbGRlcj4pID0+IGFwaS5jcmVhdGVGb2xkZXIoZm9sZGVyKSxcbiAgICBvblN1Y2Nlc3M6IChuZXdGb2xkZXIpID0+IHtcbiAgICAgIHF1ZXJ5Q2xpZW50LmludmFsaWRhdGVRdWVyaWVzKHsgcXVlcnlLZXk6IHF1ZXJ5S2V5cy5mb2xkZXJzLmFsbCB9KTtcbiAgICAgIFxuICAgICAgcXVlcnlDbGllbnQuc2V0UXVlcnlEYXRhPEZvbGRlcltdPihcbiAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYWxsLCBcbiAgICAgICAgKG9sZCkgPT4gb2xkID8gWy4uLm9sZCwgbmV3Rm9sZGVyXSA6IFtuZXdGb2xkZXJdXG4gICAgICApO1xuICAgIH0sXG4gICAgb25FcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGZvbGRlcjonLCBlcnJvcik7XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VVcGRhdGVGb2xkZXIoKSB7XG4gIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICByZXR1cm4gdXNlTXV0YXRpb24oe1xuICAgIG11dGF0aW9uRm46ICh7IGlkLCB1cGRhdGVzIH06IHsgaWQ6IG51bWJlcjsgdXBkYXRlczogUGFydGlhbDxGb2xkZXI+IH0pID0+IFxuICAgICAgYXBpLnVwZGF0ZUZvbGRlcihpZCwgdXBkYXRlcyksXG4gICAgb25NdXRhdGU6IGFzeW5jICh7IGlkLCB1cGRhdGVzIH0pID0+IHtcbiAgICAgIGF3YWl0IHF1ZXJ5Q2xpZW50LmNhbmNlbFF1ZXJpZXMoeyBxdWVyeUtleTogcXVlcnlLZXlzLmZvbGRlcnMuYnlJZChpZCkgfSk7XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzRm9sZGVyID0gcXVlcnlDbGllbnQuZ2V0UXVlcnlEYXRhPEZvbGRlcj4oXG4gICAgICAgIHF1ZXJ5S2V5cy5mb2xkZXJzLmJ5SWQoaWQpXG4gICAgICApO1xuXG4gICAgICBxdWVyeUNsaWVudC5zZXRRdWVyeURhdGE8Rm9sZGVyPihcbiAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYnlJZChpZCksXG4gICAgICAgIChvbGQpID0+IG9sZCA/IHsgLi4ub2xkLCAuLi51cGRhdGVzIH0gOiB1bmRlZmluZWRcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7IHByZXZpb3VzRm9sZGVyIH07XG4gICAgfSxcbiAgICBvbkVycm9yOiAoZXJyLCB2YXJpYWJsZXMsIGNvbnRleHQpID0+IHtcbiAgICAgIGlmIChjb250ZXh0Py5wcmV2aW91c0ZvbGRlcikge1xuICAgICAgICBxdWVyeUNsaWVudC5zZXRRdWVyeURhdGEoXG4gICAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYnlJZCh2YXJpYWJsZXMuaWQpLFxuICAgICAgICAgIGNvbnRleHQucHJldmlvdXNGb2xkZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uU2V0dGxlZDogKGZvbGRlcikgPT4ge1xuICAgICAgaWYgKGZvbGRlcikge1xuICAgICAgICBxdWVyeUNsaWVudC5pbnZhbGlkYXRlUXVlcmllcyh7IHF1ZXJ5S2V5OiBxdWVyeUtleXMuZm9sZGVycy5hbGwgfSk7XG4gICAgICAgIHF1ZXJ5Q2xpZW50LmludmFsaWRhdGVRdWVyaWVzKHsgXG4gICAgICAgICAgcXVlcnlLZXk6IHF1ZXJ5S2V5cy5mb2xkZXJzLmJ5SWQoZm9sZGVyLmlkKSBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VVcGRhdGVUYXNrKCkge1xuICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG5cbiAgcmV0dXJuIHVzZU11dGF0aW9uKHtcbiAgICBtdXRhdGlvbkZuOiAoeyBpZCwgdXBkYXRlcyB9OiB7IGlkOiBudW1iZXI7IHVwZGF0ZXM6IFBhcnRpYWw8VGFzaz4gfSkgPT4gXG4gICAgICBhcGkudXBkYXRlVGFzayhpZCwgdXBkYXRlcyksXG4gICAgb25NdXRhdGU6IGFzeW5jICh7IGlkLCB1cGRhdGVzIH0pID0+IHtcbiAgICAgIGF3YWl0IHF1ZXJ5Q2xpZW50LmNhbmNlbFF1ZXJpZXMoeyBxdWVyeUtleTogcXVlcnlLZXlzLnRhc2tzLmJ5SWQoaWQpIH0pO1xuXG4gICAgICBjb25zdCBwcmV2aW91c1Rhc2sgPSBxdWVyeUNsaWVudC5nZXRRdWVyeURhdGE8VGFzaz4oXG4gICAgICAgIHF1ZXJ5S2V5cy50YXNrcy5ieUlkKGlkKVxuICAgICAgKTtcblxuICAgICAgcXVlcnlDbGllbnQuc2V0UXVlcnlEYXRhPFRhc2s+KFxuICAgICAgICBxdWVyeUtleXMudGFza3MuYnlJZChpZCksXG4gICAgICAgIChvbGQpID0+IG9sZCA/IHsgLi4ub2xkLCAuLi51cGRhdGVzIH0gOiB1bmRlZmluZWRcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7IHByZXZpb3VzVGFzayB9O1xuICAgIH0sXG4gICAgb25FcnJvcjogKGVyciwgdmFyaWFibGVzLCBjb250ZXh0KSA9PiB7XG4gICAgICBpZiAoY29udGV4dD8ucHJldmlvdXNUYXNrKSB7XG4gICAgICAgIHF1ZXJ5Q2xpZW50LnNldFF1ZXJ5RGF0YShcbiAgICAgICAgICBxdWVyeUtleXMudGFza3MuYnlJZCh2YXJpYWJsZXMuaWQpLFxuICAgICAgICAgIGNvbnRleHQucHJldmlvdXNUYXNrXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvblNldHRsZWQ6IChmb2xkZXIpID0+IHtcbiAgICAgIGlmIChmb2xkZXIpIHtcbiAgICAgICAgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoeyBxdWVyeUtleTogcXVlcnlLZXlzLnRhc2tzLmFsbCB9KTtcbiAgICAgICAgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoeyBcbiAgICAgICAgICBxdWVyeUtleTogcXVlcnlLZXlzLnRhc2tzLmJ5SWQoZm9sZGVyLmlkKSBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VDcmVhdGVUYXNrKCkge1xuICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG4gIHJldHVybiB1c2VNdXRhdGlvbih7XG4gICAgbXV0YXRpb25GbjogKHRhc2s6IFBhcnRpYWw8VGFzaz4pID0+IGFwaS5jcmVhdGVUYXNrKHRhc2spLFxuICAgIG9uTXV0YXRlOiBhc3luYyAobmV3VGFzaykgPT4ge1xuICAgICAgYXdhaXQgcXVlcnlDbGllbnQuY2FuY2VsUXVlcmllcyh7IFxuICAgICAgICBxdWVyeUtleTogbmV3VGFzay5mb2xkZXJJZCBcbiAgICAgICAgICA/IHF1ZXJ5S2V5cy5mb2xkZXJzLmJ5SWQobmV3VGFzay5mb2xkZXJJZClcbiAgICAgICAgICA6IHF1ZXJ5S2V5cy50YXNrcy5hbGwgXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHByZXZpb3VzRm9sZGVyRGF0YSA9IG5ld1Rhc2suZm9sZGVySWRcbiAgICAgICAgPyBxdWVyeUNsaWVudC5nZXRRdWVyeURhdGEocXVlcnlLZXlzLmZvbGRlcnMuYnlJZChuZXdUYXNrLmZvbGRlcklkKSlcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBpZiAobmV3VGFzay5mb2xkZXJJZCkge1xuICAgICAgICBxdWVyeUNsaWVudC5zZXRRdWVyeURhdGEoXG4gICAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYnlJZChuZXdUYXNrLmZvbGRlcklkKSwgXG4gICAgICAgICAgKG9sZDogRm9sZGVyIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW9sZCkgcmV0dXJuIG9sZDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLm9sZCxcbiAgICAgICAgICAgICAgdGFza3M6IFsuLi5vbGQudGFza3MsIHsgLi4ubmV3VGFzaywgaWQ6ICd0ZW1wLWlkJyB9IGFzIFRhc2tdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHByZXZpb3VzRm9sZGVyRGF0YSB9O1xuICAgIH0sXG4gICAgb25TdWNjZXNzOiAodGFzaykgPT4ge1xuICAgICAgaWYgKHRhc2suZm9sZGVySWQpIHtcbiAgICAgICAgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoeyBcbiAgICAgICAgICBxdWVyeUtleTogcXVlcnlLZXlzLmZvbGRlcnMuYnlJZCh0YXNrLmZvbGRlcklkKSBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBxdWVyeUNsaWVudC5yZWZldGNoUXVlcmllcyh7IHF1ZXJ5S2V5OiBxdWVyeUtleXMudGFza3MuYWxsIH0pO1xuICAgIH0sXG4gICAgb25FcnJvcjogKGVycm9yLCBuZXdUYXNrLCBjb250ZXh0KSA9PiB7XG4gICAgICBpZiAobmV3VGFzay5mb2xkZXJJZCAmJiBjb250ZXh0Py5wcmV2aW91c0ZvbGRlckRhdGEpIHtcbiAgICAgICAgcXVlcnlDbGllbnQuc2V0UXVlcnlEYXRhKFxuICAgICAgICAgIHF1ZXJ5S2V5cy5mb2xkZXJzLmJ5SWQobmV3VGFzay5mb2xkZXJJZCksXG4gICAgICAgICAgY29udGV4dC5wcmV2aW91c0ZvbGRlckRhdGFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgdGFzazonLCBlcnJvcik7XG4gICAgfSxcbiAgfSk7XG59XG5cbmludGVyZmFjZSBUYXNrUG9zaXRpb25VcGRhdGUge1xuICBpZDogbnVtYmVyO1xuICBwb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVXBkYXRlVGFza1Bvc2l0aW9uKCkge1xuICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG5cbiAgcmV0dXJuIHVzZU11dGF0aW9uKHtcbiAgICBtdXRhdGlvbkZuOiAoeyBpZCwgcG9zaXRpb24gfTogVGFza1Bvc2l0aW9uVXBkYXRlKSA9PiBcbiAgICAgIGFwaS51cGRhdGVUYXNrUG9zaXRpb24oaWQsIHBvc2l0aW9uKSxcbiAgICBvblN1Y2Nlc3M6ICh0YXNrKSA9PiB7XG4gICAgICBpZiAodGFzaz8uZm9sZGVySWQpIHtcbiAgICAgICAgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoeyBcbiAgICAgICAgICBxdWVyeUtleTogcXVlcnlLZXlzLmZvbGRlcnMuYnlJZCh0YXNrLmZvbGRlcklkKSBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWxldGVGb2xkZXIoKSB7XG4gIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcblxuICByZXR1cm4gdXNlTXV0YXRpb24oe1xuICAgIG11dGF0aW9uRm46IChpZDogbnVtYmVyKSA9PiBhcGkuZGVsZXRlRm9sZGVyKGlkKSxcbiAgICBvbk11dGF0ZTogYXN5bmMgKGlkKSA9PiB7XG4gICAgICBhd2FpdCBxdWVyeUNsaWVudC5jYW5jZWxRdWVyaWVzKHsgcXVlcnlLZXk6IHF1ZXJ5S2V5cy5mb2xkZXJzLmFsbCB9KTtcblxuICAgICAgY29uc3QgcHJldmlvdXNGb2xkZXJzID0gcXVlcnlDbGllbnQuZ2V0UXVlcnlEYXRhPEZvbGRlcltdPihcbiAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYWxsXG4gICAgICApO1xuXG4gICAgICBxdWVyeUNsaWVudC5zZXRRdWVyeURhdGE8Rm9sZGVyW10+KFxuICAgICAgICBxdWVyeUtleXMuZm9sZGVycy5hbGwsXG4gICAgICAgIChvbGQpID0+IG9sZD8uZmlsdGVyKGZvbGRlciA9PiBmb2xkZXIuaWQgIT09IGlkKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHsgcHJldmlvdXNGb2xkZXJzIH07XG4gICAgfSxcbiAgICBvbkVycm9yOiAoZXJyLCBpZCwgY29udGV4dCkgPT4ge1xuICAgICAgaWYgKGNvbnRleHQ/LnByZXZpb3VzRm9sZGVycykge1xuICAgICAgICBxdWVyeUNsaWVudC5zZXRRdWVyeURhdGEoXG4gICAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYWxsLFxuICAgICAgICAgIGNvbnRleHQucHJldmlvdXNGb2xkZXJzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvblNldHRsZWQ6ICgpID0+IHtcbiAgICAgIHF1ZXJ5Q2xpZW50LmludmFsaWRhdGVRdWVyaWVzKHsgcXVlcnlLZXk6IHF1ZXJ5S2V5cy5mb2xkZXJzLmFsbCB9KTtcbiAgICB9LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUR1cGxpY2F0ZUZvbGRlcigpIHtcbiAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuXG4gIHJldHVybiB1c2VNdXRhdGlvbih7XG4gICAgbXV0YXRpb25GbjogKGlkOiBudW1iZXIpID0+IGFwaS5kdXBsaWNhdGVGb2xkZXIoaWQpLFxuICAgIG9uU3VjY2VzczogKG5ld0ZvbGRlcikgPT4ge1xuICAgICAgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoeyBxdWVyeUtleTogcXVlcnlLZXlzLmZvbGRlcnMuYWxsIH0pO1xuICAgICAgcXVlcnlDbGllbnQuc2V0UXVlcnlEYXRhPEZvbGRlcltdPihcbiAgICAgICAgcXVlcnlLZXlzLmZvbGRlcnMuYWxsLFxuICAgICAgICAob2xkKSA9PiBvbGQgPyBbLi4ub2xkLCBuZXdGb2xkZXJdIDogW25ld0ZvbGRlcl1cbiAgICAgICk7XG4gICAgfSxcbiAgICBvbkVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBkdXBsaWNhdGUgZm9sZGVyOicsIGVycm9yKTtcbiAgICB9LFxuICB9KTtcbn0iXSwibmFtZXMiOlsidXNlUXVlcnkiLCJ1c2VNdXRhdGlvbiIsInVzZVF1ZXJ5Q2xpZW50IiwiYXBpIiwiUVVFUllfS0VZUyIsIkZPTERFUlMiLCJUQVNLUyIsInF1ZXJ5S2V5cyIsImZvbGRlcnMiLCJhbGwiLCJieUlkIiwiaWQiLCJ0YXNrcyIsInVzZUZvbGRlcnMiLCJxdWVyeUtleSIsInF1ZXJ5Rm4iLCJnZXRGb2xkZXJzIiwic3RhbGVUaW1lIiwicmV0cnkiLCJ1c2VUYXNrcyIsImdldFRhc2tzIiwidXNlRm9sZGVyIiwiZ2V0Rm9sZGVyIiwiZW5hYmxlZCIsInVzZUNyZWF0ZUZvbGRlciIsInF1ZXJ5Q2xpZW50IiwibXV0YXRpb25GbiIsImZvbGRlciIsImNyZWF0ZUZvbGRlciIsIm9uU3VjY2VzcyIsIm5ld0ZvbGRlciIsImludmFsaWRhdGVRdWVyaWVzIiwic2V0UXVlcnlEYXRhIiwib2xkIiwib25FcnJvciIsImVycm9yIiwiY29uc29sZSIsInVzZVVwZGF0ZUZvbGRlciIsInVwZGF0ZXMiLCJ1cGRhdGVGb2xkZXIiLCJvbk11dGF0ZSIsImNhbmNlbFF1ZXJpZXMiLCJwcmV2aW91c0ZvbGRlciIsImdldFF1ZXJ5RGF0YSIsInVuZGVmaW5lZCIsImVyciIsInZhcmlhYmxlcyIsImNvbnRleHQiLCJvblNldHRsZWQiLCJ1c2VVcGRhdGVUYXNrIiwidXBkYXRlVGFzayIsInByZXZpb3VzVGFzayIsInVzZUNyZWF0ZVRhc2siLCJ0YXNrIiwiY3JlYXRlVGFzayIsIm5ld1Rhc2siLCJmb2xkZXJJZCIsInByZXZpb3VzRm9sZGVyRGF0YSIsInJlZmV0Y2hRdWVyaWVzIiwidXNlVXBkYXRlVGFza1Bvc2l0aW9uIiwicG9zaXRpb24iLCJ1cGRhdGVUYXNrUG9zaXRpb24iLCJ1c2VEZWxldGVGb2xkZXIiLCJkZWxldGVGb2xkZXIiLCJwcmV2aW91c0ZvbGRlcnMiLCJmaWx0ZXIiLCJ1c2VEdXBsaWNhdGVGb2xkZXIiLCJkdXBsaWNhdGVGb2xkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useTasks.ts\n"));

/***/ })

});