
import builder from "@daybrush/builder";
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    tsconfig: "tsconfig.build.json",
    external: {
        "preact": "preact",
        "preact/compat": "preact/compat",
        "@daybrush/utils": "@daybrush/utils",
        "css-styled": "css-styled",
        "framework-utils": "framework-utils",
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
    sourcemap: false,
};

export default builder([
    {
        ...defaultOptions,
        input: "src/preact-css-styled/index.esm.ts",
        output: "./dist/styled.esm.js",
        exports: "named",
        format: "es",
    },
    {
        ...defaultOptions,
        input: "src/preact-css-styled/index.cjs.ts",
        output: "./dist/styled.cjs.js",
        exports: "named",
        format: "cjs",
    },
]);
