import React from "react";
import { firestore } from "./config";

const deleteData = async (docId) => {
  try {
    await firestore.collection("notes").doc(docId.toString()).delete();
  } catch (error) {}
};

export { deleteData };
