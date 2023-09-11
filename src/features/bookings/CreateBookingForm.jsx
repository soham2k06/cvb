import styled from "styled-components";
import { useForm } from "react-hook-form";
import countryFlagEmoji from "country-flag-emoji";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";
import { useEditBooking } from "./useEditBooking";

import { countries } from "../../utils/constants";

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { cabins } = useCabins();
  const cabinNames = cabins?.map((cabin) => cabin.name);

  const { isCreating, createBooking } = useCreateBooking();

  const { isEditing, editBooking } = useEditBooking();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = bookingToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const startDate = new Date(getValues("startDate")).getTime();
  const endDate = new Date(getValues("endDate")).getTime();
  const now = Date.now();

  const { errors } = formState;
  function onSubmit(data) {
    if (isEditSession)
      editBooking(
        { newBookingData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createBooking(
        { ...data, numNights: endDate / 86400000 - startDate / 86400000 },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest name" error={errors?.guestName?.message}>
        <Input
          type="text"
          id="guestName"
          disabled={isWorking}
          {...register("guestName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="guestCountryCode" error={errors?.cabinName?.message}>
        <Select
          name="guestCountryCode"
          id="guestCountryCode"
          {...register("guestCountryCode")}
        >
          {countries?.map((country, i) => (
            <option key={i} value={country.code}>
              {countryFlagEmoji.get(country.code)?.emoji} {country.name}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="Guest email" error={errors?.guestEmail?.message}>
        <Input
          type="email"
          id="guestEmail"
          disabled={isWorking}
          {...register("guestEmail", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin name." error={errors?.cabinName?.message}>
        <Select name="cabinName" id="cabinName" {...register("cabinName")}>
          {cabinNames?.map((cabin, i) => (
            <option key={i} defaultValue={cabinNames[0]} value={cabin}>
              {cabin}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", {
            required: "This field is required",
            validate: (value) =>
              new Date(value).getTime() > now - 86400000 ||
              "Starting date must not be past",
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isWorking}
          {...register("endDate", {
            required: "This field is required",
            validate: (value) =>
              new Date(value).getTime() > startDate ||
              "End date must be higher than start date",
          })}
        />
      </FormRow>

      <FormRow label="Num. of nights">
        <Input
          type="text"
          disabled
          value={
            endDate / 86400000 - startDate / 86400000 > 0
              ? endDate / 86400000 - startDate / 86400000
              : "--"
          }
        />
      </FormRow>

      <FormRow label="Num. of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          defaultValue={1}
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="number"
          id="observations"
          defaultValue=""
          disabled={isWorking}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            "Edit booking"
          ) : (
            "Create new booking"
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
