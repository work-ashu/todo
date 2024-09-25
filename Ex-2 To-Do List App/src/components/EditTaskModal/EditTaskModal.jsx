import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import "../Modal/Modal.css";
const EditTaskModal = forwardRef(function ({ children }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="modal">
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default EditTaskModal;
