import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";

export default function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 1,
    discountedPrice: 1,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setFormData({ ...formData, userRef: currentUser.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted, auth, formData, navigate]);

  if (loading) {
    return (
      <div
        aria-label="loading spinner"
        className="absolute z-99999 grid size-full place-items-center bg-black/20"
      >
        <Spinner />
      </div>
    );
  }

  return <div>CreateListing</div>;
}
