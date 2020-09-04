import styled, * as others from "./styled";

for (const name in others) {
    (styled as any)[name] = (others as any)[name];
}
export default styled;
