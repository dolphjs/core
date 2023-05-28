const ErrorMsgs = {
  NOT_MONGOOSE_DB:
    "The constructor's optional param supports mongodb database only. To make use of another database then call the function in the index.js or index.ts file like a function Example:`sequelize.sync() ` for mysql. Visit <https://github.com/dolphjs/core>",
  FILE_NOT_ACCEPTABLE: 'The media file you sent is not supported by this application',
};

module.exports.ErrorMsgs = ErrorMsgs;
