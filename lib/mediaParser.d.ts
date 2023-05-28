export = mediaParser;
/**
 *
 * @param {{allowedExtensions?: string[], type:string, storage?: multer.DiskStorageOptions, fieldname: string,limit?:number
 * }} options
 * mediaParser processes media files [built on multer]
 */
declare function mediaParser(options: {
    allowedExtensions?: string[];
    type: string;
    storage?: multer.DiskStorageOptions;
    fieldname: string;
    limit?: number;
}): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
import multer = require("multer");
//# sourceMappingURL=mediaParser.d.ts.map