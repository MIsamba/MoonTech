import Image from "next/image";
import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <Image width={24} height={24} alt="create_event" src="/plus.svg"/>
      <span className="pl-3 pr-7"> Create</span>
    </button>
  );
}