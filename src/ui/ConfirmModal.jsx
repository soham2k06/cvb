import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import SpinnerMini from "./SpinnerMini";

const StyledConfirmModal = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmModal({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  type,
  action,
  text,
}) {
  return (
    <StyledConfirmModal>
      <Heading as="h3">
        {action} {resourceName}
      </Heading>
      <p>Are you sure you want to {text} This action cannot be undone.</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation={type}
          disabled={disabled}
          onClick={() => onConfirm()}
        >
          {disabled ? <SpinnerMini /> : action}
        </Button>
      </div>
    </StyledConfirmModal>
  );
}

export default ConfirmModal;
