import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase.config";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = formData;

  console.log(auth.currentUser);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="px-2 py-4">
      <div className="flex justify-between">
        <p className="text-xl font-bold">My Profile</p>
        <button
          onClick={onLogout}
          className="cursor-pointer rounded-full bg-green-500 px-3 py-1 font-medium text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
