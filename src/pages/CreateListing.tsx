import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";

type ListingType = "rent" | "sale";

interface FormData {
  type: ListingType;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  images: File[];
  latitude: number;
  longitude: number;
  userRef?: string;
}

export default function CreateListing() {
  const [geolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
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

  /*
   * AUTH
   *
   * IMPORTANT:
   * Do not put formData in the dependency array.
   * Otherwise setFormData() causes this effect to run again
   * and can create an infinite update loop.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setFormData((prevState) => ({
          ...prevState,
          userRef: currentUser.uid,
        }));
      } else {
        navigate("/sign-in");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  /* SUBMIT */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    const geolocation = {};
    let location;

    /* Geolocation API key NOT VALID */
    if (geolocation) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GEOCODE_API_KEY}`,
      );

      const data = await response.json();
      console.log(data);

      geolocation.lat = data.results[0].geometry.location.lat ?? 0;
      geolocation.lng = data.results[0].geometry.location.lng ?? 0;

      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0].formatted_address;

      if (location === undefined) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      location = address;

      console.log(geolocation, location);
    }

    setLoading(false);

    console.log("Form Data:", formData);
  };

  /* TEXT / NUMBER INPUTS */
  const onMutate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]:
        e.target instanceof HTMLInputElement && e.target.type === "number"
          ? Number(value)
          : value,
    }));
  };

  /* SELL / RENT */
  const onTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as ListingType;

    setFormData((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  /*
   * YES / NO
   *
   * Used for:
   * - parking
   * - furnished
   * - offer
   */
  const onBooleanChange = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.currentTarget;

    const booleanValue = value === "true";

    setFormData((prevState) => ({
      ...prevState,
      [id]: booleanValue,
    }));
  };

  /* IMAGES */
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length > 6) {
      setLoading(false);
      toast.error("Max 6 images.");
      e.target.value = "";
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      images: Array.from(files),
    }));
  };

  if (loading) {
    return (
      <div
        aria-label="loading spinner"
        className="absolute z-50 grid size-full place-items-center bg-black/20"
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8 px-2 py-4 pb-[84px]">
      <header>
        <p className="text-2xl font-bold">Create a Listing</p>
      </header>

      <main className="min-h-screen">
        <form onSubmit={onSubmit} className="space-y-4 font-medium">
          {/* ==================== SELL / RENT ==================== */}

          <div className="flex flex-col gap-1">
            <label>Sell / Rent</label>

            <div className="flex gap-4 font-bold">
              {/* SELL */}
              <button
                type="button"
                value="sale"
                onClick={onTypeChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  type === "sale"
                    ? "bg-green-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                Sell
              </button>

              {/* RENT */}
              <button
                type="button"
                value="rent"
                onClick={onTypeChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  type === "rent"
                    ? "bg-green-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                Rent
              </button>
            </div>
          </div>

          {/* ==================== NAME ==================== */}

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

          {/* ==================== BEDROOMS ==================== */}

          <div className="inline-grid gap-1">
            <label htmlFor="bedrooms" className="w-fit cursor-pointer">
              Bedrooms
            </label>

            <input
              className="max-w-20 rounded-lg bg-white p-2 text-sm outline-none"
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onMutate}
              min={1}
              required
            />
          </div>

          {/* ==================== BATHROOMS ==================== */}

          <div className="inline-grid gap-1">
            <label htmlFor="bathrooms" className="w-fit cursor-pointer">
              Bathrooms
            </label>

            <input
              className="max-w-20 rounded-lg bg-white p-2 text-sm outline-none"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onMutate}
              min={1}
              required
            />
          </div>

          {/* ==================== PARKING ==================== */}

          <div className="flex flex-col gap-1">
            <label>Parking Spot</label>

            <div className="flex gap-4 font-bold">
              {/* YES */}
              <button
                type="button"
                id="parking"
                value="true"
                onClick={onBooleanChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  parking ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                Yes
              </button>

              {/* NO */}
              <button
                type="button"
                id="parking"
                value="false"
                onClick={onBooleanChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  !parking ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* ==================== FURNISHED ==================== */}

          <div className="flex flex-col gap-1">
            <label>Furnished</label>

            <div className="flex gap-4 font-bold">
              {/* YES */}
              <button
                type="button"
                id="furnished"
                value="true"
                onClick={onBooleanChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  furnished ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                Yes
              </button>

              {/* NO */}
              <button
                type="button"
                id="furnished"
                value="false"
                onClick={onBooleanChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  !furnished ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* ==================== ADDRESS ==================== */}

          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="w-fit cursor-pointer">
              Address
            </label>

            <textarea
              className="max-w-60 rounded-lg bg-white p-2 text-sm outline-none"
              id="address"
              value={address}
              onChange={onMutate}
              required
            />
          </div>

          {/* ==================== LATITUDE / LONGITUDE ==================== */}

          {!geolocationEnabled && (
            <div className="flex gap-8">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="latitude" className="w-fit cursor-pointer">
                  Latitude
                </label>

                <input
                  className="rounded-lg bg-white p-2 text-center text-sm outline-none"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <label htmlFor="longitude" className="w-fit cursor-pointer">
                  Longitude
                </label>

                <input
                  className="rounded-lg bg-white p-2 text-center text-sm outline-none"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          {/* ==================== OFFER ==================== */}

          <div className="flex flex-col gap-1">
            <label>Offer</label>

            <div className="flex gap-4 font-bold">
              {/* YES */}
              <button
                type="button"
                id="offer"
                value="true"
                onClick={onBooleanChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  offer ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                Yes
              </button>

              {/* NO */}
              <button
                type="button"
                id="offer"
                value="false"
                onClick={onBooleanChange}
                className={`w-fit cursor-pointer rounded-lg px-8 py-2 ${
                  !offer ? "bg-green-500 text-white" : "bg-white text-black"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* ==================== REGULAR PRICE ==================== */}

          <div className="inline-grid gap-1">
            <label htmlFor="regularPrice" className="w-fit cursor-pointer">
              Regular Price
            </label>

            <div className="flex items-center gap-6">
              <input
                className="max-w-24 rounded-lg bg-white p-2 text-center text-sm outline-none"
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onMutate}
                min={0}
                required
              />

              {type === "rent" && <p>$ / Month</p>}
            </div>
          </div>

          {/* ==================== DISCOUNTED PRICE ==================== */}

          {offer && (
            <div className="inline-grid gap-1 pl-4">
              <label htmlFor="discountedPrice" className="w-fit cursor-pointer">
                Discounted Price
              </label>

              <input
                className="max-w-24 rounded-lg bg-white p-2 text-center text-sm outline-none"
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                min={0}
                required={offer}
              />
            </div>
          )}

          {/* ==================== IMAGES ==================== */}

          <div className="space-y-2 rounded-lg text-sm outline-none">
            <p className="text-base font-bold">Images</p>
            <p className="mb-3 font-medium text-gray-500">
              This first image will be the cover (max 6).
            </p>

            <div className="flex items-center gap-4 rounded-lg bg-white p-2">
              {/* CUSTOM CHOOSE FILES BUTTON */}
              <label
                htmlFor="images"
                className="w-fit cursor-pointer rounded-2xl bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Choose Files
              </label>

              {/* FILE NAME */}
              <span className="text-sm text-gray-600">
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : "No file chosen"}
              </span>

              {/* HIDDEN FILE INPUT */}
              <input
                className="hidden"
                type="file"
                id="images"
                onChange={onImageChange}
                required
                multiple
                accept=".jpg,.png,.jpeg"
              />
            </div>

            {/* SELECTED FILE NAMES */}
            {images.length > 0 && (
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                {images.map((image, index) => (
                  <p key={`${image.name}-${index}`}>
                    {index + 1}. {image.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* ==================== SUBMIT ==================== */}

          <button
            className="mx-auto my-8 block w-fit cursor-pointer rounded-lg bg-green-500 px-6 py-2 text-center text-white transition outline-none hover:bg-green-600"
            type="submit"
          >
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}
