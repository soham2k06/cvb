import { useState } from "react";
import supabase from "../services/supabase";

import { fakeBookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import Button from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";

async function createBookings() {
  const { error } = await supabase.from("bookings").insert(fakeBookings);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

function Uploader() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteCabins();

    // Bookings need to be created LAST
    await createCabins();
    await createBookings();

    queryClient.invalidateQueries({ queryKey: ["cabins"] });
    queryClient.invalidateQueries({ queryKey: ["bookings"] });
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    queryClient.invalidateQueries({ queryKey: ["bookings"] });
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "var(--color-indigo-100)",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>FAKE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload all data"}
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
