import styled from "react-css-styled";
import { StylerInterface } from "./types";


export default styled as (Tag: string, css: string) => new (...args: any[]) => StylerInterface;
