import clsx from "clsx";
import React from "react";
import { BiX } from "react-icons/bi";
import Card from "./Card";

export default function Modal({
  showModal,
  setShowModal,
  children,
}: {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(!showModal && "hidden", "z-50")}>
      {/* Modal backdrop */}
      <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-primary-300/30"></div>

      {/* Modal */}
      <Card classes="fixed top-6 z-50 mx-auto max-w-lg p-6 shadow">
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <BiX size={24} />
        </div>

        {children}
      </Card>
    </div>
  );
}
