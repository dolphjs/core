/// <reference types="node" />
export = OwlFactory;
declare class OwlFactory {
    /**
     *
     * @param {Array<{path?: string; router:  import("express").Router}>} routes
     * @param {string|number} port
     * @param {string|number} env
     * @param {{mongodbConfig: {url:string, options:Object}, otherDbConfig: Function}} param3
     */
    constructor(routes: Array<{
        path?: string;
        router: import("express").Router;
    }>, port: string | number, env: string | number, { mongodbConfig, otherDbConfig }: {
        mongodbConfig: {
            url: string;
            options: any;
        };
        otherDbConfig: Function;
    });
    app: import(".pnpm/@types+express-serve-static-core@4.17.32/node_modules/@types/express-serve-static-core").Express;
    env: string | number;
    port: string | number;
    /**
     *
     * @returns {Server<typeof IncomingMessage, typeof ServerResponse>}
     */
    listen(): Server<typeof IncomingMessage, typeof ServerResponse>;
    initDatabase(config: any): void;
    /**
     *
     * @returns {express.Express}
     */
    server(): express.Express;
    /**
     *
     * @param {Array<{path?: string; router: import("express").Router}>}  routes
     */
    initalizeRoutes(routes: Array<{
        path?: string;
        router: import("express").Router;
    }>): void;
    initalizeMiddleWares(): void;
    initializeNotFoundHandler(): void;
    initializeConfig(env: any): void;
    initializeErrorHandlers(): void;
    exitHandler(): void;
    unexpectedErrorHandler: (error: any) => void;
    initClosureHandler(): void;
}
declare namespace OwlFactory {
    export { catchAsync, logger, Router, httpStatus, AppRes };
}
import { Server } from "http";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import express = require("express");
import catchAsync = require("./catchAsync");
import logger = require("../config/logger");
declare const Router: typeof express.Router;
import httpStatus = require("http-status");
import AppRes = require("./appRes");
//# sourceMappingURL=OwlFactory.d.ts.map