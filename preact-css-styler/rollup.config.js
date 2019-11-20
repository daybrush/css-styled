
import builder from "@daybrush/builder";
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    tsconfig: "tsconfig.build.json",
    external: {
        "preact": "preact",
        "preact/compat": "preact/compat",
    },
    exports: "named",
    plugins: [
        preact({
            noPropTypes: true,
            noEnv: true,
            noReactIs: true,
            usePreactX: true,
            // resolvePreactCompat: true,
        }),
    ],
};

export default builder([
    {
        ...defaultOptions,
        input: "src/preact-css-styler/styled.ts",
        output: "./dist/styler.esm.js",
        exports: "default",
        format: "es",
    },
    {
        ...defaultOptions,
        input: "src/preact-css-styler/styled.ts",
        output: "./dist/styler.cjs.js",
        exports: "default",
        format: "cjs",
    },
]);
