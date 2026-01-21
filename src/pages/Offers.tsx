import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ListingItem from "../components/ListingItem";
import { db } from "../firebase.config";

export default function Offers() {
  const [listings, setListings] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        /* GET A REFERENCE */
        const listingsRef = collection(db, "listing");

        /* CREATE A QUERY */
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10),
        );

        /* EXECUTE QUERY */
        const querySnapshot = await getDocs(q);

        const listings: any[] = [];

        querySnapshot.forEach((doc) => {
          console.log(doc);
          console.log(doc.id, " => ", doc.data());

          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <header>
        <h1 className="text-2xl font-semibold">Offers</h1>
      </header>

      <section>
        {loading && <p>Loading...</p>}

        {!loading && (!listings || listings.length === 0) && (
          <p>There are no current offers.</p>
        )}

        {!loading && listings && listings.length > 0 && (
          <ul>
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
