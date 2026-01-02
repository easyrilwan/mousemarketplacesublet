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

        <div>
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="size-1/6 rounded-2xl object-cover"
            />
          </Link>

          <Link to="/category/sell">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="size-1/6 rounded-2xl object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
