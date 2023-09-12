import { useBookings } from "./useBookings";

import BookingRow, { Amount, Cabin, Stacked } from "./BookingRow";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  const bookingSkeletons = [];
  for (var i = 1; i <= 8; i++) {
    bookingSkeletons.push(i);
  }

  if (bookings?.length === 0) return <Empty resourceName="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {isLoading ? (
          bookingSkeletons.map((booking) => (
            <Table.Row key={booking}>
              <Cabin isLoading>----</Cabin>
              <Stacked isLoading>
                <span>-</span>
                <span>--------------------</span>
              </Stacked>
              <Stacked isLoading>
                <span>-</span>
                <span>---------------------</span>
              </Stacked>
              <Cabin isLoading>-</Cabin>

              <Amount isLoading>-</Amount>
            </Table.Row>
          ))
        ) : (
          <Table.Body
            data={bookings}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />
        )}

        {!isLoading && (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        )}
      </Table>
    </Menus>
  );
}

export default BookingTable;
