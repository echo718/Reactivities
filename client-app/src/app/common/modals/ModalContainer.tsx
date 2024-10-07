import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal } from "semantic-ui-react";

export const ModalContainer = observer(() => {
  const { modalStore } = useStore();

  return (
    <Modal
      open={modalStore.modal.open}
      size="mini"
      onClose={modalStore.closeModel}
    >
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  );
});
