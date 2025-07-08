import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Notecard from "../../components/Cards/Notecard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Notecard
            title="Meeting on 7 th"
            date="3rd apr 2024"
            content="Lorem ipsum dolor sit amet."
            tags="#tag"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <button
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-700 absolute right-10 bottom-10 cursor-pointer"
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            <MdAdd className="text-[32px] text-white" />
          </button>
          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
            contentLabel=""
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
          >
            <AddEditNotes
              onClose={() =>
                setOpenAddEditModal({
                  isShown: false,
                  type: "add",
                  data: null,
                })
              }
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}
