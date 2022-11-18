import { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebase, auth, firestore, analytics } from "../firebase/config.js";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { postUsers } from "../firebase/postDataToFireStore";

const Registration = () => {
  const [toggle, setToggle] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (auth.currentUser) {
      postUsers(user);
    }
  }, [user]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };

  const SignOut = () => {
    auth.signOut();
    window.location.reload(true);
  };

  const ProfileInfo = () => {
    const { uid, photoURL } = auth.currentUser;

    return (
      <Fragment>
        <div className="relative peer hover:cursor-pointer h-[70px] mb-[80px] z-50">
          <img className="h-[40px] w-[40px] rounded-full" src={photoURL} />
        </div>

        <div
          className="hidden absolute peer-hover:flex hover:flex
                  flex-col bg-white drop-shadow-lg p-5 w-[11em] mt-[70px] mr-11 z-50
                    "
        >
          <div className="hover:font-bold hover:cursor-pointer p-2">
            Profile
          </div>

          <div
            className="hover:font-bold hover:cursor-pointer p-2"
            onClick={SignOut}
          >
            Logout
          </div>
        </div>
      </Fragment>
    );
  };

  const LoginSignUp = () => {
    return (
      <Fragment>
        <button className="w-[80px] text-sm p-2 border-2 border-black mr-2 font-bold hover:bg-gray-200 rounded-lg">
          Log in
        </button>
        <button
          className="w-[80px] text-sm p-2 border-2 border-black bg-black font-bold hover:text-gray-200 rounded-lg text-white "
          onClick={handleToggle}
        >
          Sign up
        </button>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="flex justify-center content-center mt-4 ">
        {auth.currentUser ? <ProfileInfo /> : <LoginSignUp />}
      </div>

      <div
        className={
          toggle
            ? "fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            : "hidden"
        }
      >
        <div className="flex justify-center h-full w-full">
          <div
            className="flex justify-center h-full backdrop-blur-sm w-full"
            onClick={handleToggle}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white h-[25em] w-[25em] flex justify-center content-center rounded-lg shadow-2xl">
              <div className="mt-[10em]">
                <div
                  className="flex h-[50px]  w-[15em] font-bold p-2 rounded-lg border-4 
                         hover:cursor-pointer hover:bg-gray-200 border-black
                         "
                  onClick={signInWithGoogle}
                >
                  <div className="flex justify-start">
                    <div className="p-1 px-3 text-[20px]">
                      <FcGoogle />
                    </div>
                    Sign in with google
                  </div>
                </div>
                <div
                  className="flex h-[50px]  w-[15em] font-bold p-2 rounded-lg border-4 
                         hover:cursor-pointer hover:bg-gray-200 border-black mt-2
                         "
                  onClick={signInWithFacebook}
                >
                  <div className="flex justify-start ">
                    <div className="p-1 px-3 text-[20px]">
                      <ImFacebook2 />
                    </div>
                    Sign in with facebook
                  </div>
                </div>
                <div className="text-center p-10 text-blue-800 hover:cursor-pointer hover:text-blue-500">
                  already signed in ?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Registration;
