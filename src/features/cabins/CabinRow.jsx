import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiPhoto, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { useCreateCabin } from "./useCreateCabin";

import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmModal from "../../ui/ConfirmModal";
import { useState } from "react";

export const Img = styled.img`
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

export const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";

  background-color: ${({ isLoading }) =>
    isLoading ? "var(--color-grey-200)" : "transparent"};
  border-radius: 5px;
  color: var(--color-grey-${({ isLoading }) => (isLoading ? 200 : 600)});
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img
        src={image}
        isLoading={isImageLoading}
        onLoad={() => setIsImageLoading(false)}
      />
      {isImageLoading && (
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
      )}
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmModal
                resourceName="cabins"
                text="delete this cabin permanently?"
                action="delete"
                type="danger"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
