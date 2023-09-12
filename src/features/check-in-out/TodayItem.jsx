import countryFlagEmoji from "country-flag-emoji";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";

import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

export const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-${(props) => (props.isLoading ? 100 : 0)});
  border-radius: 8px;
  font-size: 1.4rem;
  padding: ${(props) => (props.isLoading ? "0.8rem 8px" : "0.8rem 0")};
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guestName, numNights, guestCountryCode } = activity;
  const countryFlag = countryFlagEmoji.get(guestCountryCode).emoji;
  if (activity.status === "checked-out") return;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <span>{countryFlag}</span>
      <Guest>{guestName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
