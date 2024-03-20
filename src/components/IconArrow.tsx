import styled from "@emotion/styled";

interface IconArrowProps {
  direction: "right" | "left" | "top" | "bottom";
}

function IconArrow(props: IconArrowProps) {
  const { direction } = props;

  function handleDirection() {
    switch (direction) {
      case "left":
        return "rotate(-135deg)";
      case "top":
        return "rotate(-45deg)";
      case "bottom":
        return "rotate(135deg)";
      case "right":
        return "rotate(45deg)";
      default:
        return "none";
    }
  }
  return (
    <Arrow
      style={{
        transform: `${handleDirection()}`,
      }}
    />
  );
}

const Arrow = styled.div`
  width: 7px;
  height: 7px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  opacity: 0.5;
`;

export default IconArrow;
