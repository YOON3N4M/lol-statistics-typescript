import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const style = css`
  ul {
    padding: 0 0;
    margin: 0px;
  }
  li {
    list-style: none;
  }
`;

export default function GlobalStyles() {
  return <Global styles={style} />;
}
