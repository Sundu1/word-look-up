import React from "react";
import { firestore } from "./config";

const postUsers = async (user) => {
  try {
    firestore.collection("users").doc(user.uid).set({
      id: user.uid,
      name: user.displayName,
      email_address: user.email,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const postNotes = async (note) => {
  try {
    firestore
      .collection("notes")
      .doc(note.doc.toString())
      .set({
        user: note.user,
        note: note.data,
      })
      .then(() => {
        console.log("Document successfully written!");
        alert("saved successfully");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } catch (error) {
    console.error(error.message);
  }
};

const postWords = async (data, userId) => {
  try {
    const doc = Date.now();
    firestore
      .collection("words")
      .doc(doc.toString())
      .set({
        user: userId,
        word: data.word,
        definition: data.def,
        pronunciation: data.pron_us,
      })
      .then(() => {
        console.log("word successfully uploaded!");
        alert("word saved successfully");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } catch (err) {
    console.error(err.message);
  }
};

export { postNotes, postUsers, postWords };
