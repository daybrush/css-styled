
import builder from "@daybrush/builder";

export default builder([
    {
        tsconfig: "tsconfig.build.json",
        input: "src/PureProps.tsx",
        output: "./dist/pure-props.esm.js",
        exports: "default",
        format: "es",
    },
    {
        tsconfig: "tsconfig.build.json",
        input: "src/PureProps.tsx",
        output: "./dist/pure-props.cjs.js",
        exports: "default",
        format: "cjs",
    },
]);
