import styled from "styled-components";

interface Props {
  champion: any;
}

const SumLi = styled.li`
  height: 24px;
  margin-top: 8px;
  display: flex;
  align-items: center;
`;
const ChampionIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;
const WinLose = styled.div`
  font-size: 11px;
  position: relative;
  color: "#9AA4AF";
`;

const Text = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;
function Summarys({ champion }: Props) {
  const name = champion[0];
  const match = champion[1];

  const win = match.filter((e: any) => e.win === true).length;
  const lose = match.filter((e: any) => e.win === false).length;
  const kills: number = match.reduce(function add(sum: any, item: any) {
    return sum + item.kills;
  }, 0);
  const deaths: number = match.reduce(function add(sum: any, item: any) {
    return sum + item.deaths;
  }, 0);
  const assists: number = match.reduce(function add(sum: any, item: any) {
    return sum + item.assists;
  }, 0);
  const winRate = (win / (win + lose)) * 100;
  const kda: any = ((kills + assists) / deaths).toFixed(2);
  let winRateColor = "#9AA4AF";
  let kdaColor = "#9AA4AF";

  if (Math.round(winRate) >= 60) {
    winRateColor = "#D31A45";
  }
  if (4 > kda && kda >= 3) {
    kdaColor = "#00bba3";
  } else if (5 > kda && kda >= 4) {
    kdaColor = "#0093ff";
  } else if (kda >= 5) {
    kdaColor = "#F06F00";
  }
  return (
    <>
      <SumLi>
        <ChampionIcon
          src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${name}.png`}
        />

        <WinLose>
          <Text color={winRateColor}>{Math.round(winRate)}% </Text>
          <Text color="#9AA4AF">
            ({win}승 {lose}패)
          </Text>
          <Text color={kdaColor}> {kda} 평점</Text>
        </WinLose>
      </SumLi>
    </>
  );
}

export default Summarys;
