import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../firebase.config";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName ?? "",
    email: auth.currentUser?.email ?? "",
  });

  const { name, email } = formData;

  console.log(auth.currentUser);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser.displayName !== name) {
        // Update display name in Firebase Auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in Firestore database
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });

        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return ( 
    <div className="space-y-8 px-2 py-4">
      <header className="flex justify-between">
        <p className="text-xl font-bold">My Profile</p>
        <button
          onClick={onLogout}
          className="cursor-pointer rounded-full bg-green-500 px-3 py-1 font-medium text-white"
        >
          Log Out
        </button>
      </header>

      <div className="space-y-2">
        <div className="flex justify-between">
          <p>Personal Details</p>

          <button
            className="cursor-pointer font-medium text-green-500"
            onClick={() => {
              if (changeDetails) {
                onSubmit();
              }

              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </button>
        </div>

        <div>
          <form className="space-y-4">
            <input
              type="text"
              id="name"
              className={`w-full rounded-lg border border-transparent bg-gray-200 p-3 outline-0 transition-colors ${
                changeDetails ? "border bg-white focus:border-green-500" : ""
              }`}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
              placeholder="Name"
            />

            <input
              type="email"
              id="email"
              className={`w-full rounded-lg border border-transparent bg-gray-200 p-3 outline-0 transition-colors disabled:cursor-not-allowed ${
                changeDetails ? "border focus:border-green-500" : ""
              }`}
              disabled={true}
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
