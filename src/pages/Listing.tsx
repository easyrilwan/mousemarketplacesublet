import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { db } from "../firebase.config";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  usestates

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  

  console.log(navigate);
  console.log(params);
  console.log(auth);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();

    // return () => {
    //   second;
    // };
  }, [params.listingId]);

  return <div>Listing</div>;
}
