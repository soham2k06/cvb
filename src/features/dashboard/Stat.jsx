import { Icon, StyledStat, Title, Value } from "./StatStyles";

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color} greyscale="100">
        {icon}
      </Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
