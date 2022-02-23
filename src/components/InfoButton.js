import React from "react";
import { useState } from "react";
import InfoBackdrop from "./InfoBackdrop";
import InfoModal from "./InfoModal";

export const InfoButton = ({ info }) => {
  const [showModal, setShowModal] = useState();
  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }
  return (
    <div>
      <button className="btn" onClick={showModalHandler}>
        View
      </button>

      {showModal && <InfoBackdrop onClick={closeModalHandler} />}
      {showModal && <InfoModal info={info} onClose={closeModalHandler} />}
    </div>
  );
};
