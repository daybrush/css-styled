
import builder from "@daybrush/builder";
import reactCompat from "rollup-plugin-react-compat";

const external = {
    "react-simple-compat": "react-simple-compat",
    "@daybrush/utils": "utils",
    "css-styled": "css-styled",
    "framework-utils": "framework-utils"
};


const reactPlugin = reactCompat({
    useReactCompat: true,
})



export default builder([
    {
        sourcemap: false,
        input: "src/index.ts",
        output: "./dist/styled.esm.js",
        exports: "default",
        format: "es",
        plugins: [reactPlugin],
        external,
    },
    {
        sourcemap: false,
        input: "src/index.ts",
        output: "./dist/styled.cjs.js",
        exports: "default",
        plugins: [reactPlugin],
        format: "cjs",
        external,
    },
]);
