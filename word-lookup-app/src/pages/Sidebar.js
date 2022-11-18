import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ board }) => {
  return (
    <div className="relative">
      <div className="bg-gray-200 shadow w-[240px] h-full">
        <div className="flex justify-center p-2">
          <div
            className="mt-8 flex bg-green-500 text-white p-2 rounded-lg w-[150px] hover:bg-green-600  hover:cursor-pointer transition"
            name="newnotes"
            onClick={board}
          >
            <div className="px-1">+</div> New
          </div>
        </div>
        <div className="p-2 flex justify-center">
          <div
            className="flex bg-gray-500 text-white p-2 rounded-lg w-[150px] hover:bg-gray-600  hover:cursor-pointer transition"
            name="noteslist"
            onClick={board}
          >
            Notes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
