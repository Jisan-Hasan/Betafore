"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    var _a;
    const errors = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: ((_a = error === null || error === void 0 ? void 0 : error.issues[0]) === null || _a === void 0 ? void 0 : _a.message) || "Validation Error",
        errorMessages: errors,
    };
};
exports.default = handleZodError;
