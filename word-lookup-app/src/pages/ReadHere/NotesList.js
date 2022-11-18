import { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { deleteData } from "../../firebase/deleteData";
import { geNotes } from "../../firebase/getDataFronFireStore";
import UpdateNote from "./updateNote";

const NotesList = ({ userId, SelectionToolBox }) => {
  const [noteslist, setNoteslist] = useState([]);

  useEffect(() => {
    geNotes(setNoteslist, userId);
  }, [noteslist]);

  const handleDelete = (docId) => {
    deleteData(docId);
  };

  return (
    <div>
      <div
        id="global"
        className="absolute left-5 right-0 grid grid-cols-4 p-2 overflow-auto h-full"
      >
        {noteslist.map((note, i) => {
          return (
            <div key={i} className="notelist group relative">
              <UpdateNote
                docId={note.docId}
                SelectionToolBox={SelectionToolBox}
              />

              <div className="absolute hidden group-hover:flex top-0 right-0 p-3 hover:cursor-pointer">
                <ImCancelCircle
                  className=" text-red-800 hover:text-red-300"
                  onClick={() => handleDelete(note.docId)}
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    note.data.note.length > 50
                      ? `${note.data.note}`.substring(0, 50) + "..."
                      : `${note.data.note}`,
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesList;
