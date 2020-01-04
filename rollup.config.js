
import builder from "@daybrush/builder";

const defaultConfig = {
    name: "styled",
    input: "src/styled.ts",
    exports: "default",
    commonjs: true,
}
export default builder([
    {
        ...defaultConfig,
        output: "./dist/styled.js",
    },
    {
        ...defaultConfig,
        output: "./dist/styled.min.js",
        uglify: true,
    },
    {
        ...defaultConfig,
        output: "./dist/styled.pkgd.js",
        resolve: true,
    },
    {
        ...defaultConfig,
        output: "./dist/styled.pkgd.min.js",
        resolve: true,
        uglify: true,
    },
    {
        ...defaultConfig,
        output: "./dist/styled.esm.js",
        format: "es",
    },
    {
        ...defaultConfig,
        output: "./dist/styled.cjs.js",
        format: "cjs",
    },
]);
