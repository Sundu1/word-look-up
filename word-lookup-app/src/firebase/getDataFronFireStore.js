import React from "react";
import { firestore } from "./config";

const geNotes = async (setNoteslist, user) => {
  try {
    const response = firestore.collection("notes");
    const docs = await response.where("user", "==", user).get();
    const data = docs.docs.map((doc) => {
      return { data: doc.data(), docId: doc.id };
    });

    setNoteslist([...data]);
  } catch (error) {
    console.error(error.message);
  }
};

const getSingleNote = async (setUpdateNote, docId) => {
  try {
    const data = (
      await firestore.collection("notes").doc(docId.toString()).get()
    ).data();

    setUpdateNote(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getWords = async (Setwords, user) => {
  try {
    const response = firestore.collection("words");
    const docs = await response.where("user", "==", user).get();
    const data = docs.docs.map((doc) => {
      return { data: doc.data(), docId: doc.id };
    });

    Setwords([...data]);
  } catch (err) {
    console.error(err.message);
  }
};

export { geNotes, getSingleNote, getWords };
