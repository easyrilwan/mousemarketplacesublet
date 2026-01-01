import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../firebase.config";

export default function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // Create user if doesn't exist
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ?? "",
          email: user.email ?? "",
          timestamp: serverTimestamp(),
        });
      }

      toast.success("Signed in successfully");

      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>

      <button
        onClick={onGoogleClick}
        className="cursor-pointer rounded-full bg-white p-2 shadow-lg"
      >
        <FcGoogle size={24} />
      </button>
    </div>
  );
}

// If your are facing CORS issues, use this
/*
  import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
  import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
  import { FcGoogle } from "react-icons/fc";
  import { useEffect } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";

  import { db } from "../firebase.config";

  export default function OAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Handle redirect result after coming back from Google
    useEffect(() => {
      (async () => {
        try {
          const result = await getRedirectResult(auth);
          if (result) {
            const user = result.user;

            // CHECK FOR USER
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);

            // IF USER DOESN'T EXIST, CREATE USER
            if (!docSnap.exists()) {
              await setDoc(doc(db, "user", user.uid), {
                name: user.displayName ?? "",
                email: user.email ?? "",
                timestamp: serverTimestamp(),
              });
            }

            navigate("/");
            toast.success("Signed in successfully");
          }
        } catch (error) {
          toast.error("Could not authorize with Google");
          console.log(error);
        }
      })();
    }, [auth, navigate]);

    const onGoogleClick = async () => {
      try {
        await signInWithRedirect(auth, provider);
      } catch (error) {
        toast.error("Could not start Google sign-in");
        console.log(error);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>

        <button
          onClick={onGoogleClick}
          className="cursor-pointer rounded-full bg-white p-2 shadow-lg"
        >
          <FcGoogle size={24} />
        </button>
      </div>
    );
  }
*/
