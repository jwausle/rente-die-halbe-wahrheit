module.exports = function(config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "src/test/base.spec.ts" },
            { pattern: "src/app/**/*.ts" },
            { pattern: "src/test/**/*.spec.ts" }
        ],

        preprocessors: {
           "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require("karma-typescript-angular2-transform")
                ]
            },
            compilerOptions: {
                lib: ["ES2015", "DOM"]
            }
        },

        reporters: ["dots", "karma-typescript"],

        browsers: ["Chrome"],
     });
};
