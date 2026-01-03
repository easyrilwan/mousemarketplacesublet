import { Link } from "react-router-dom";

import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

export default function Explore() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Explore</h1>

      <div className="space-y-2">
        {/* Slider */}

        <p className="font-semibold">Categories</p>

        <div className="space-x-4">
          <Link to="/category/rent" className="flex-1">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="inline-block aspect-video min-h-20 max-w-40 rounded-2xl object-cover"
            />
          </Link>

          <Link to="/category/sell" className="flex-1">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="inline-block aspect-video min-h-20 max-w-40 rounded-2xl object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
