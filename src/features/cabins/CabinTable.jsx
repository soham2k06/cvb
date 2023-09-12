import CabinRow, { Cabin, Img } from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { HiPhoto } from "react-icons/hi2";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (cabins?.length === 0) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  const cabinSkeletons = [];
  for (var i = 1; i <= 8; i++) {
    cabinSkeletons.push(i);
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {isLoading ? (
          cabinSkeletons.map((cabin) => (
            <Table.Row key={cabin}>
              <div
                style={{
                  width: "5rem",
                  height: "3rem",
                  color: "var(--color-grey-400)",
                  backgroundColor: "var(--color-grey-200)",
                  padding: ".3rem",
                  transform: "scale(1.5) translateX(-7px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HiPhoto fontSize={20} />
              </div>
              <Cabin isLoading>name</Cabin>
              <Cabin isLoading>Fits up to 00 guests</Cabin>
              <Cabin isLoading>------</Cabin>
              <Cabin isLoading>-</Cabin>
            </Table.Row>
          ))
        ) : (
          <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        )}
      </Table>
    </Menus>
  );
}

export default CabinTable;
