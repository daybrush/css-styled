
import builder from "@daybrush/builder";


const external = {
    "react": "React",
    "react-dom": "ReactDOM",
    "@daybrush/utils": "utils",
    "css-styled": "css-styled",
};
export default builder([
    {
        tsconfig: "tsconfig.build.json",
        input: "src/react-css-styled/index.ts",
        output: "./dist/styled.esm.js",
        exports: "named",
        format: "es",
        external,
    },
    {
        tsconfig: "tsconfig.build.json",
        input: "src/react-css-styled/index.umd.ts",
        output: "./dist/styled.cjs.js",
        exports: "default",
        format: "cjs",
        external,
    },
]);
