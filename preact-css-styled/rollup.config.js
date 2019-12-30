
import builder from "@daybrush/builder";
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    tsconfig: "tsconfig.build.json",
    external: {
        "preact": "preact",
        "preact/compat": "preact/compat",
        "@daybrush/utils": "@daybrush/utils",
        "css-styled": "css-styled",
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
        input: "src/preact-css-styled/styled.ts",
        output: "./dist/styled.esm.js",
        exports: "default",
        format: "es",
    },
    {
        ...defaultOptions,
        input: "src/preact-css-styled/styled.ts",
        output: "./dist/styled.cjs.js",
        exports: "default",
        format: "cjs",
    },
]);
