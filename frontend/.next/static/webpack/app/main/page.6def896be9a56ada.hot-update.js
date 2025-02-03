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

/***/ "(app-pages-browser)/./src/api/index.ts":
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ApiError: function() { return /* binding */ ApiError; },\n/* harmony export */   api: function() { return /* binding */ api; },\n/* harmony export */   handleApiError: function() { return /* binding */ handleApiError; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\nclass ApiError extends Error {\n    constructor(message, status, code){\n        super(message);\n        this.message = message;\n        this.status = status;\n        this.code = code;\n        this.name = \"ApiError\";\n    }\n}\nfunction handleApiError(error) {\n    if (error.response) {\n        throw new ApiError(error.response.data.message || \"An error occurred\", error.response.status, error.response.data.code);\n    } else if (error.request) {\n        throw new ApiError(\"No response from server\", 503);\n    } else {\n        throw new ApiError(error.message, 500);\n    }\n}\nconst client = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: process.env.NEXT_PUBLIC_API_URL || \"http://localhost:8000/api\",\n    headers: {\n        \"Content-Type\": \"application/json\"\n    }\n});\nclient.interceptors.response.use((response)=>response.data, (error)=>{\n    var _error_response;\n    console.error(\"API Error:\", ((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data) || error.message);\n    handleApiError(error);\n});\nconst api = {\n    async getFolders () {\n        return client.get(\"/folders\");\n    },\n    async getFolder (id) {\n        return client.get(\"/folders/\".concat(id));\n    },\n    async createFolder (folder) {\n        return client.post(\"/folders\", folder);\n    },\n    async updateFolder (id, updates) {\n        return client.put(\"/folders/\".concat(id), updates);\n    },\n    async deleteFolder (id) {\n        return client.delete(\"/folders/\".concat(id));\n    },\n    async getTasks () {\n        return client.get(\"/tasks\");\n    },\n    async duplicateFolder (id) {\n        return client.put(\"/folders/\".concat(id));\n    },\n    async createTask (task) {\n        return client.post(\"/tasks\", task);\n    },\n    async updateTask (id, updates) {\n        return client.put(\"/tasks/\".concat(id), updates);\n    },\n    async updateTaskPosition (id, position) {\n        return client.put(\"/tasks/\".concat(id, \"/position\"), position);\n    },\n    async updateTaskConnections (id, connections) {\n        return client.put(\"/tasks/\".concat(id, \"/connections\"), {\n            connections\n        });\n    },\n    async deleteTask (id) {\n        return client.delete(\"/tasks/\".concat(id));\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXBpL2luZGV4LnRzPzAyNjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IFRhc2ssIEZvbGRlciB9IGZyb20gJ0AvdHlwZXMvdGFzayc7XG5pbXBvcnQgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcsXG4gICAgcHVibGljIHN0YXR1czogbnVtYmVyLFxuICAgIHB1YmxpYyBjb2RlPzogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdBcGlFcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFwaUVycm9yKGVycm9yOiBBeGlvc0Vycm9yKTogbmV2ZXIge1xuICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoXG4gICAgICBlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2UgfHwgJ0FuIGVycm9yIG9jY3VycmVkJyxcbiAgICAgIGVycm9yLnJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGVycm9yLnJlc3BvbnNlLmRhdGEuY29kZVxuICAgICk7XG4gIH0gZWxzZSBpZiAoZXJyb3IucmVxdWVzdCkge1xuICAgIHRocm93IG5ldyBBcGlFcnJvcignTm8gcmVzcG9uc2UgZnJvbSBzZXJ2ZXInLCA1MDMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBBcGlFcnJvcihlcnJvci5tZXNzYWdlLCA1MDApO1xuICB9XG59XG5cbmNvbnN0IGNsaWVudCA9IGF4aW9zLmNyZWF0ZSh7XG4gIGJhc2VVUkw6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGknLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbn0pO1xuXG5jbGllbnQuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShcbiAgKHJlc3BvbnNlKSA9PiByZXNwb25zZS5kYXRhLFxuICAoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdBUEkgRXJyb3I6JywgZXJyb3IucmVzcG9uc2U/LmRhdGEgfHwgZXJyb3IubWVzc2FnZSk7XG4gICAgaGFuZGxlQXBpRXJyb3IoZXJyb3IpO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgYXBpID0ge1xuICBhc3luYyBnZXRGb2xkZXJzKCk6IFByb21pc2U8Rm9sZGVyW10+IHtcbiAgICByZXR1cm4gY2xpZW50LmdldCgnL2ZvbGRlcnMnKTtcbiAgfSxcblxuICBhc3luYyBnZXRGb2xkZXIoaWQ6IG51bWJlcik6IFByb21pc2U8Rm9sZGVyPiB7XG4gICAgcmV0dXJuIGNsaWVudC5nZXQoYC9mb2xkZXJzLyR7aWR9YCk7XG4gIH0sXG5cbiAgYXN5bmMgY3JlYXRlRm9sZGVyKGZvbGRlcjogUGFydGlhbDxGb2xkZXI+KTogUHJvbWlzZTxGb2xkZXI+IHtcbiAgICByZXR1cm4gY2xpZW50LnBvc3QoJy9mb2xkZXJzJywgZm9sZGVyKTtcbiAgfSxcblxuICBhc3luYyB1cGRhdGVGb2xkZXIoaWQ6IG51bWJlciwgdXBkYXRlczogUGFydGlhbDxGb2xkZXI+KTogUHJvbWlzZTxGb2xkZXI+IHtcbiAgICByZXR1cm4gY2xpZW50LnB1dChgL2ZvbGRlcnMvJHtpZH1gLCB1cGRhdGVzKTtcbiAgfSxcblxuICBhc3luYyBkZWxldGVGb2xkZXIoaWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBjbGllbnQuZGVsZXRlKGAvZm9sZGVycy8ke2lkfWApO1xuICB9LFxuXG4gIGFzeW5jIGdldFRhc2tzKCk6IFByb21pc2U8VGFza1tdPiB7XG4gICAgcmV0dXJuIGNsaWVudC5nZXQoJy90YXNrcycpO1xuICB9LFxuXG4gIGFzeW5jIGR1cGxpY2F0ZUZvbGRlcihpZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGNsaWVudC5wdXQoYC9mb2xkZXJzLyR7aWR9YCk7XG4gIH0sXG5cbiAgYXN5bmMgY3JlYXRlVGFzayh0YXNrOiBQYXJ0aWFsPFRhc2s+KTogUHJvbWlzZTxUYXNrPiB7XG4gICAgcmV0dXJuIGNsaWVudC5wb3N0KCcvdGFza3MnLCB0YXNrKTtcbiAgfSxcblxuICBhc3luYyB1cGRhdGVUYXNrKGlkOiBudW1iZXIsIHVwZGF0ZXM6IFBhcnRpYWw8VGFzaz4pOiBQcm9taXNlPFRhc2s+IHtcbiAgICByZXR1cm4gY2xpZW50LnB1dChgL3Rhc2tzLyR7aWR9YCwgdXBkYXRlcyk7XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlVGFza1Bvc2l0aW9uKFxuICAgIGlkOiBudW1iZXIsIFxuICAgIHBvc2l0aW9uOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1cbiAgKTogUHJvbWlzZTxUYXNrPiB7XG4gICAgcmV0dXJuIGNsaWVudC5wdXQoYC90YXNrcy8ke2lkfS9wb3NpdGlvbmAsIHBvc2l0aW9uKTtcbiAgfSxcblxuICBhc3luYyB1cGRhdGVUYXNrQ29ubmVjdGlvbnMoXG4gICAgaWQ6IG51bWJlciwgXG4gICAgY29ubmVjdGlvbnM6IHN0cmluZ1tdXG4gICk6IFByb21pc2U8VGFzaz4ge1xuICAgIHJldHVybiBjbGllbnQucHV0KGAvdGFza3MvJHtpZH0vY29ubmVjdGlvbnNgLCB7IGNvbm5lY3Rpb25zIH0pO1xuICB9LFxuXG4gIGFzeW5jIGRlbGV0ZVRhc2soaWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBjbGllbnQuZGVsZXRlKGAvdGFza3MvJHtpZH1gKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBpRXJyb3Ige1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59Il0sIm5hbWVzIjpbImF4aW9zIiwiQXBpRXJyb3IiLCJFcnJvciIsImNvbnN0cnVjdG9yIiwibWVzc2FnZSIsInN0YXR1cyIsImNvZGUiLCJuYW1lIiwiaGFuZGxlQXBpRXJyb3IiLCJlcnJvciIsInJlc3BvbnNlIiwiZGF0YSIsInJlcXVlc3QiLCJjbGllbnQiLCJjcmVhdGUiLCJiYXNlVVJMIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJoZWFkZXJzIiwiaW50ZXJjZXB0b3JzIiwidXNlIiwiY29uc29sZSIsImFwaSIsImdldEZvbGRlcnMiLCJnZXQiLCJnZXRGb2xkZXIiLCJpZCIsImNyZWF0ZUZvbGRlciIsImZvbGRlciIsInBvc3QiLCJ1cGRhdGVGb2xkZXIiLCJ1cGRhdGVzIiwicHV0IiwiZGVsZXRlRm9sZGVyIiwiZGVsZXRlIiwiZ2V0VGFza3MiLCJkdXBsaWNhdGVGb2xkZXIiLCJjcmVhdGVUYXNrIiwidGFzayIsInVwZGF0ZVRhc2siLCJ1cGRhdGVUYXNrUG9zaXRpb24iLCJwb3NpdGlvbiIsInVwZGF0ZVRhc2tDb25uZWN0aW9ucyIsImNvbm5lY3Rpb25zIiwiZGVsZXRlVGFzayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/api/index.ts\n"));

/***/ })

});