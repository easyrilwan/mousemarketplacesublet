import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../firebase.config";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState<DocumentData | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  console.log(searchParams);
  console.log(params);

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.landlordId]);

  return (
    <div>
      <header>Contact Landlord</header>

      <a
        href={`mailto:easyrilwan@gmail.com?Subject=${searchParams.get("listingName")}&body=${message}`}
      >
        Send Message
      </a>

      {landlord !== null && (
        <main>
          <div>
            <p>{landlord?.name}</p>
          </div>

          <a
            href={`mailto:${landloard.email}?Subject=${searchParams.get("listingName")}&body=${message}`}
          >
            Send Message
          </a>
        </main>
      )}
    </div>
  );
}
