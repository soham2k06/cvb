import { faker } from "@faker-js/faker";
import { add } from "date-fns";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(minDays, maxDays) {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);
  const randomDate = new Date(
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())
  );
  return randomDate;
}

// Cabin names
const cabinNames = [
  "Cozy Pine",
  "Serene Oak",
  "Rustic Birch",
  "Cedar Creek",
  "Fox Hollow",
  "Trunc Maple",
  "Timber Ridge",
  "Mount Log",
];

export const fakeBookings = [
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    numGuests: 1,
    numNights: 7,
    cabinName: "VVIP",
    extraPrice: 2500,
    cabinPrice: 12000,

    hasBreakfast: true,
    isPaid: false,

    guestName: "Soham Bhikadiya",
    guestEmail: "sohmm.dev@gmail.com",
    guestCountryCode: "IN",
    status: "unconfirmed",
    observations: "I am VIP",
  },
];
const countryCodes = [
  "IN",
  "US",
  "CA",
  "GB",
  "AU",
  "DE",
  "FR",
  "ES",
  "IT",
  "JP",
];

for (let i = 0; i < 48; i++) {
  const numGuests = getRandomInt(1, 15);
  const startDate = new Date(fromToday(getRandomInt(-90, 15)));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + getRandomInt(1, 15));
  const numNights = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const cabinName = cabinNames[i % 8];
  const hasBreakfast = Math.random() < 0.5;
  const isPaid = Math.random() < 0.5;
  const cabinPrice = getRandomInt(3000, 6000) * numNights;
  const extraPrice = hasBreakfast ? 200 * numGuests * numNights : 0;

  const guestName = faker.person.fullName();
  const guestEmail = `${guestName.split(" ")[0]}@example.com`;
  const guestCountryCode =
    countryCodes[getRandomInt(1, countryCodes.length - 1)];

  // Set status based on startDate and endDate
  let status = "unconfirmed";
  const currentDate = new Date();

  if (currentDate >= startDate && currentDate <= endDate) {
    status = "checked-in";
  } else if (currentDate > endDate) {
    status = "checked-out";
  }

  const observations = Math.random() < 0.5 ? faker.lorem.sentence() : "";

  const booking = {
    created_at: getRandomDate(-90, 0),
    startDate,
    endDate,
    numGuests,
    numNights,
    cabinName,
    hasBreakfast,
    isPaid,
    cabinPrice,
    extraPrice,
    guestName,
    guestEmail,
    guestCountryCode,
    status,
    observations,
  };

  fakeBookings.push(booking);
}
