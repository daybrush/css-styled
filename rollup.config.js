
import builder from "@daybrush/builder";


const external = {
    "react": "React",
    "react-dom": "ReactDOM",
    "@daybrush/utils": "utils",
};
export default builder([
    {
        tsconfig: "tsconfig.build.json",
        input: "src/react-css-styler/index.ts",
        output: "./dist/styler.esm.js",
        exports: "default",
        format: "es",
        commonjs: true,
        resolve: true,
        external,
    },
    {
        tsconfig: "tsconfig.build.json",
        input: "src/react-css-styler/index.ts",
        output: "./dist/styler.cjs.js",
        exports: "default",
        format: "cjs",
        commonjs: true,
        resolve: true,
        external,
    },
]);
