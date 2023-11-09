export = AppRes;
declare class AppRes extends Error {
    /**
     *
     * @param {string|number} statusCode
     * @param {string|object} message
     * @param {boolean} isOperational
     * @param {string} stack
     */
    constructor(statusCode: string | number, message: string | object, isOperational?: boolean, stack?: string);
    statusCode: string | number;
    isOperational: boolean;
    stack: string;
}
//# sourceMappingURL=appRes.d.ts.map