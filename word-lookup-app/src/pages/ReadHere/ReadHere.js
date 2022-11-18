import React, { useEffect, useState, Fragment, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getWordAPI } from "../../model/getData";
import Sidebar from "../Sidebar";
import { postNotes } from "../../firebase/postDataToFireStore";
import { Toolbar } from "../../components/Toolbar";
import NotesList from "./NotesList";

const ReadHere = ({ userId }) => {
  const [toolbarData, setToolbarData] = useState({});
  const [note, setNote] = useState({});
  const [board, setBoard] = useState("");
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    if (toolbarData.text) {
      getWordAPI(toolbarData.text, setApiData);
    }
  }, [toolbarData]);

  useEffect(() => {
    setBoard(<NotesList userId={userId} />);
  }, []);

  document.onpointerdown = (e) => {
    if (!e.target.closest("#toolbar")) {
      setToolbarData({});
    }
  };

  const SelectionToolBox = () => {
    setApiData({});
    let text = "";

    if (window.getSelection) {
      const selection = window.getSelection();
      text = selection.toString().trim();
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      const yValue = window.pageYOffset + rect.top;
      setToolbarData({
        y: yValue,
        x: rect.x,
        text,
      });
    }
  };

  //save
  let isCtrl = false;
  document.onkeydown = function (e) {
    if (e.keyCode == 17) isCtrl = true;
    if (e.keyCode == 83 && isCtrl == true) {
      postNotes({ user: userId, data: note.data, doc: note.doc });
      return false;
    }
  };

  const handleBoard = (e) => {
    const name = e.target.getAttribute("name");
    if (name === "newnotes") {
      setNote({});
      setBoard(
        <NewNote
          note={note}
          setNote={setNote}
          SelectionToolBox={SelectionToolBox}
        />
      );
    }
    if (name === "noteslist") {
      setNote({});
      setBoard(
        <NotesList userId={userId} SelectionToolBox={SelectionToolBox} />
      );
    }
  };

  return (
    <Fragment>
      <div
        className="absolute flex w-full "
        style={{ height: `calc(100%  - 5em)` }}
      >
        <Sidebar board={handleBoard} />
        <div className="relative flex justify-center w-full">{board}</div>
      </div>
      {toolbarData.x !== undefined ? (
        <Toolbar
          x={toolbarData.x}
          y={toolbarData.y}
          apiData={apiData}
          userId={userId}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

const NewNote = ({ note, setNote, SelectionToolBox }) => {
  const doc = Date.now();

  return (
    <div className="overflow-auto w-full" onDoubleClick={SelectionToolBox}>
      <CKEditor
        editor={ClassicEditor}
        data={note.data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
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
          setNote((old) => ({ ...old, data, doc }));
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default ReadHere;
