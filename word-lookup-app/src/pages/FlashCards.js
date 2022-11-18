import React, { useEffect, useState } from "react";
import { getWords } from "../firebase/getDataFronFireStore";

const FlashCards = ({ userId }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords(setWords, userId);
  }, []);

  return (
    <div className="flex justify-center content-center">
      <div className="">
        <table className="bg-gray-100 m-11 rounded-lg w-[50em]">
          <thead>
            <tr>
              <th className="p-3 text-center">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-center">Delete</th>
              <th className="p-3 text-center">Word</th>
              <th className="p-3 text-center">Definition</th>
              <th className="p-3 text-center">Pronunciation</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, i) => {
              return (
                <tr key={i}>
                  <td className="p-3 text-center">
                    <input type="checkbox" />
                  </td>
                  <td>delete</td>
                  <td className="p-3 text-center">{word.data.word}</td>
                  <td className="p-3 text-center">
                    {word.data.definition.length > 20
                      ? word.data.definition.substring(1, 20) + "..."
                      : word.data.definition}
                  </td>
                  <td className="p-3 text-center">
                    <audio controls>
                      <source src={word.data.pronunciation} type="audio/ogg" />
                      <source src={word.data.pronunciation} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlashCards;
