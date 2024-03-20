import { useState } from "react";

import { ParticipantsData } from "@/types/types";
import MostChampions from "./MostChampions";
import styled from "@emotion/styled";

interface Props {
  mostPlayChampions: ParticipantsData;
}
export default function MostSeven({ mostPlayChampions }: Props) {
  const most7 = mostPlayChampions.slice(0, 7);
  return (
    <>
      <MostPlayedBox>
        <MostPlayedTab>
          <MostPlayedItem selected={true}>최근게임</MostPlayedItem>
          <MostPlayedItem selected={false}></MostPlayedItem>
          <MostPlayedItem selected={false}></MostPlayedItem>
        </MostPlayedTab>
        <MostChampionContainer>
          {most7.map((champions) => (
            <MostChampions champions={champions} />
          ))}
        </MostChampionContainer>
        {/* <More>더 보기</More> */}
      </MostPlayedBox>
    </>
  );
}

const MostPlayedBox = styled.div`
  margin-top: 8px;
  background-color: white;
  border-radius: 4px;
`;
const MostPlayedTab = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin: 0px;
  font-size: 14px;
  border-bottom: 1px solid;
  border-color: #ebeef1;
`;
const MostPlayedItem = styled.li<{ selected: boolean }>`
  flex: 1;
  margin-left: 4px;
  vertical-align: middle;
  cursor: ${(props: any) => (props.selected ? "pointer" : "")};
  text-align: center;
  border-radius: 4px;
  line-height: 28px;
  background-color: ${(props: any) => (props.selected ? "#ecf2ff" : "none")};
  font-weight: ${(props: any) => (props.selected ? 700 : "")};
  color: ${(props: any) => (props.selected ? "#4171d6" : "")};
`;
const MostChampionContainer = styled.div`
  //여기서 map 으로 뿌림
  display: table;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid;
  border-color: #ebeef1;
  color: #9aa4af;
  text-align: center;
  table-layout: fixed;
`;
const More = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px;
  font-size: 12px;
  text-align: center;
  background-color: #f7f7f9;
  color: #758592;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
