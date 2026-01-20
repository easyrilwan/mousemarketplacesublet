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
        const listingsRef = collection(db, "listing");

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
          console.log(doc.id, " => ", doc.data());

          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
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
    <div className="space-y-4 p-4">
      <header>
        <h1 className="text-2xl font-semibold">
          Places for {params.categoryName === "rent" ? "rent" : "sale"}
        </h1>
      </header>

      <section>
        {loading && <p>Loading...</p>}

        {!loading && (!listings || listings.length === 0) && (
          <p className="font-bold">No listings {params.categoryName} found.</p>
        )}
        
        {!loading && listings && listings.length > 0 && (
          <ul>
            {listings.map((listing) => (
              <li key={listing.id} className="font-semibold">
                {listing.data.name || listing.id}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
