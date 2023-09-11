import Button from "../../ui/Button";
import ConfirmModal from "../../ui/ConfirmModal";
import Modal from "../../ui/Modal";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Modal>
      <Modal.Open opens="checkout-">
        <Button variation="primary" size="small">
          Check out
        </Button>
      </Modal.Open>
      <Modal.Window name="checkout-">
        <ConfirmModal
          resourceName="booking"
          text="checkout this booking?"
          action="chekout"
          disabled={isCheckingOut}
          onConfirm={() => checkout(bookingId)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
