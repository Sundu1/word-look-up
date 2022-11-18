import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Feed from "./pages/Feed";
import ReadHere from "./pages//ReadHere/ReadHere";
import FlashCards from "./pages/FlashCards";
import { Navbar } from "./pages/Navbar";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  const LoginWarning = () => {
    return <div>please log in to continue</div>;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route
          path="/read-here"
          element={user ? <ReadHere userId={user.uid} /> : <LoginWarning />}
        />
        <Route
          path="/your-flashcards"
          element={user ? <FlashCards userId={user.uid} /> : <LoginWarning />}
        />
      </Routes>
    </>
  );
}

export default App;
