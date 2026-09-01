import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

  const onMutate = (e: ChangeEvent<HTMLFormElement>) => {};

  return (
    <div className="space-y-8 px-2 py-4">
      <header>
        <p className="text-2xl font-bold">Create a Listing</p>
      </header>

      <main className="">
        <form onSubmit={onSubmit} className="space-y-4 space-x-8 font-medium">
          {/* SELL/RENT */}
          <label>Sell / Rent</label>
          <div className="space-x-2 font-bold">
            {/* SELL BUTTON */}
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

            {/* RENT BUTTON */}
            <button
              type="button"
              className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                type === "rent" ? "bg-green-500 text-white" : "bg-white"
              } `}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          {/* NAME */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="w-fit cursor-pointer">
              Name
            </label>
            <input
              className="max-w-60 rounded-lg bg-white p-2 text-sm outline-none"
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              maxLength={32}
              minLength={10}
              required
            />
          </div>

          {/* BEDROOMS */}
          <div className="inline-grid gap-1">
            <label htmlFor="bedrooms" className="w-fit cursor-pointer">
              Bedrooms
            </label>
            <input
              className="max-w-12 rounded-lg bg-white p-2 text-sm outline-none"
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onMutate}
              maxLength={32}
              minLength={10}
              required
            />
          </div>

          {/* BATHROOMS */}
          <div className="inline-grid gap-1">
            <label htmlFor="bathrooms" className="w-fit cursor-pointer">
              Bathrooms
            </label>
            <input
              className="max-w-12 rounded-lg bg-white p-2 text-sm outline-none"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onMutate}
              maxLength={32}
              minLength={10}
              required
            />
          </div>
          {/* PARKING SPOT */}
          <div className="flex flex-col gap-1">
            <label>Parking Spot</label>

            <div className="space-x-2 font-bold">
              {/* YES BUTTON */}
              <button
                type="button"
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  parking ? "bg-green-500" : "bg-white"
                } `}
                id="parking"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>

              {/* NO BUTTON */}
              <button
                type="button"
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  parking ? "bg-white" : "bg-green-500 text-white"
                } `}
                id="parking"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>
          </div>

          {/* FURNISHED */}
          <div className="space-y-8">
            <label>Furnished</label>

            <div className="space-x-2 font-bold">
              {/* YES BUTTON */}
              <button
                type="button"
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  furnished ? "bg-green-500" : "bg-white"
                } `}
                id="furnished"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>

              {/* NO BUTTON */}
              <button
                type="button"
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  furnished ? "bg-white" : "bg-green-500 text-white"
                } `}
                id="furnished"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="w-fit cursor-pointer">
              Address
            </label>
            <textarea
              className="max-w-60 rounded-lg bg-white p-2 text-sm outline-none"
              type="text"
              id="address"
              value={address}
              onChange={onMutate}
              required
            />
          </div>
        </form>
      </main>
    </div>
  );
}
