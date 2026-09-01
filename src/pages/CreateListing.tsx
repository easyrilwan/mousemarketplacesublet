import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState, type FormEvent } from "react";
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

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onMutate = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <div className="space-y-8 px-2 py-4">
      <header>
        <p className="text-2xl font-bold">Create a Listing</p>
      </header>

      <main className="">
        <form onSubmit={onSubmit} className="space-y-4">
          <label htmlFor="sale">Sell / Rent</label>

          <div className="space-x-2 font-bold">
            <button
              type="button"
              className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                type === "sale" ? "bg-green-500" : "bg-white"
              } `}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>

            <button
              type="button"
              className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                type === "rent" ? "bg-green-500" : "bg-white"
              } `}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <label htmlFor="name ">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength={32}
            minLength={10}
            required
          />
        </form>
      </main>
    </div>
  );
}
