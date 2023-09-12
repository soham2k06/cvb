import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-${(props) => (props.isLoading ? 100 : 0)});

  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(
    --color-${(props) => props.color}-${(props) =>
        props.isLoading ? 200 : 100}
  );

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;

  border-radius: 5px;
  width: fit-content;
  background-color: ${(props) =>
    props.isLoading ? "var(--color-grey-200)" : "transparent"};
  color: var(--color-grey-${(props) => (props.isLoading ? 200 : 500)});
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  background-color: ${(props) =>
    props.isLoading ? "var(--color-grey-200)" : "transparent"};
  border-radius: 5px;
  width: fit-content;
  color: var(--color-grey-${(props) => (props.isLoading ? 200 : 900)});
`;

export { Icon, StyledStat, Title, Value };
