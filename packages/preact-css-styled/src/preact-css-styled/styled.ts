import styled from "react-css-styled";
import { StyledInterface } from "./types";


export default styled as (Tag: string, css: string) => new (...args: any[]) => StyledInterface;
