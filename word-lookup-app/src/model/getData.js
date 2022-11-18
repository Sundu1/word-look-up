import axios from "axios";
const FREE_API_URL = "http://localhost:5000/";

const getWordAPI = async (word, setApiData) => {
  try {
    const response = await fetch(`${FREE_API_URL}${word}`.toLowerCase());
    const data = await response.json();
    setApiData(data);
  } catch (error) {
    console.error(error.message);
  }
};

export { getWordAPI };
