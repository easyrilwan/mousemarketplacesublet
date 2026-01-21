import { IoBedSharp } from "react-icons/io5";
import { MdBathtub, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ListingItem({ listing, id, onDelete }) {
  return (
    <li className="flex">
      <Link to={`/category/${listing}/${id}`} className="flex gap-4">
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="aspect-video max-w-40 rounded-2xl object-cover"
        />

        <div className="space-y-1">
          <div>
            <p className="text-sm text-pretty">{listing.location}</p>
            <p className="text-lg font-semibold">{listing.name}</p>
          </div>

          <p className="font-semibold text-green-500">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && "/ Month"}
          </p>

          <div className="flex items-center justify-between">
            <span>
              <IoBedSharp aria-label="bedroom" />
            </span>

            <p className="text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>

            <span>
              <MdBathtub aria-label="bathroom" aria-hidden="true" />
            </span>

            <p className="text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <span
          className="text-red-500"
          onClick={() => onDelete(listing.id, listing.name)}
        >
          <MdDelete />
        </span>
      )}
    </li>
  );
}
