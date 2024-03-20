import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const style = css`
  .styled-scroll {
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #88888875;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
  }

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
