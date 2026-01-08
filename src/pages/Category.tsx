import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../firebase.config";

export default function Category() {
  const [listings, setListings] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        /* GET A REFERENCE */
        const listingsRef = collection(db, "listings");

        /* CREATE A QUERY */
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10),
        );

        /* EXECUTE QUERY */
        const querySnapshot = await getDocs(q);

        const listings: any[] = [];

        querySnapshot.forEach((doc) => {
          console.log(doc);
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();

    // return () => {
    //   second;
    // };
  }, [params.categoryName]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold capitalize">
        {params.categoryName} Listings
      </h1>
      {loading && <p>Loading...</p>}
      {!loading && (!listings || listings.length === 0) && (
        <p>No listings found.</p>
      )}
      {!loading && listings && listings.length > 0 && (
        <ul>
          {listings.map((item) => (
            <li key={item.id} className="mb-2">
              {item.data.name || item.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
