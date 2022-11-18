import { useEffect, useState, Fragment } from "react";
import { Toolbar } from "../../components/Toolbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { WordDataRapidAPI, oxfordAPI } from "../../model/getData";
import { postNotes } from "../../firebase/postDataToFireStore";
import { getSingleNote } from "../../firebase/getDataFronFireStore";

const UpdateNote = ({ docId, SelectionToolBox }) => {
  const [updateNote, setUpdateNote] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getSingleNote(setUpdateNote, docId);
  }, [docId]);

  let isCtrl = false;
  document.onkeydown = function (e) {
    if (e.keyCode == 17) isCtrl = true;
    if (e.keyCode == 83 && isCtrl == true) {
      postNotes({
        user: updateNote.user,
        data: updateNote.note,
        doc: updateNote.docId,
      });
      return false;
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Fragment>
      <div
        onClick={handleToggle}
        className="absolute h-[150px] w-[160px]"
      ></div>

      <div
        className={
          toggle
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
            : "hidden"
        }
      >
        <div className="flex justify-center h-full w-full">
          <div
            className="flex justify-center h-full backdrop-blur-sm w-full"
            onClick={handleToggle}
          ></div>
          <div
            className="absolute top-[50px] bg-white rounded-lg shadow dark:bg-gray-700 h-[34em] w-[55em]"
            onDoubleClick={SelectionToolBox}
          >
            <CKEditor
              editor={ClassicEditor}
              data={updateNote ? updateNote.note : "hi"}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "500px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setUpdateNote((old) => ({ ...old, note: data, docId }));
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // console.log("Focus.", editor);
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateNote;
