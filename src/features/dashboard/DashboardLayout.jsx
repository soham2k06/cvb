import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart, { ChartBox } from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { Icon, StyledStat, Title, Value } from "./StatStyles";
import DashboardBox from "./DashboardBox";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();
  const isLoading = isBookingsLoading || isStaysLoading || isCabinsLoading;

  const stats = [];
  for (var i = 1; i <= 4; i++) {
    stats.push(i);
  }

  return (
    <StyledDashboardLayout>
      {isLoading ? (
        stats.map((stat) => (
          <StyledStat key={stat}>
            <Icon isLoading color="grey"></Icon>
            <Title isLoading>---------------</Title>
            <Value isLoading>000000</Value>
          </StyledStat>
        ))
      ) : (
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins?.length}
        />
      )}
      <TodayActivity />
      {isStaysLoading ? (
        <ChartBox>
          <Spinner />
        </ChartBox>
      ) : (
        <DurationChart confirmedStays={confirmedStays} />
      )}
      {isBookingsLoading ? (
        <DashboardBox>
          <Spinner />
        </DashboardBox>
      ) : (
        <SalesChart bookings={bookings} numDays={numDays} />
      )}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
