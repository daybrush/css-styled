import styled from "react-css-styler";
import { IObject } from "@daybrush/utils";
import { StylerInterface } from "./types";


export default styled as (Tag: string, css: string) => new (...args: any[]) => StylerInterface;
