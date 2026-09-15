import { getAuth } from "firebase/auth";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { db } from "../firebase.config";

interface Listing {
  name: string;
  userRef: string;
}

export default function Listing() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  console.log(params);
  console.log(auth);

  useEffect(() => {
    const fetchListing = async () => {
      if (!params.listingId) {
        setLoading(false);
        return;
      }

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

  return (
    <main>
      {/* SLIDER */}
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <p>Share Icon</p>

        {shareLinkCopied && <p>Link Copied!</p>}
      </div>

      <div>Listing</div>
      <p>{params.listingId}</p>

      {auth.currentUser?.uid !== listing.userRef && (
        <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`}>
          Contact Landlord
        </Link>
      )}
    </main>
  );
}
