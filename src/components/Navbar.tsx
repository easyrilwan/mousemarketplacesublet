import { CgProfile } from "react-icons/cg";
import { GoTag } from "react-icons/go";
import { IoCompassOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route: string) => {
    if (route === location.pathname) return true;
  };

  return (
    <nav className="bg-[#fefefe]">
      <ul className="flex justify-center gap-16 py-2">
        <li
          className="flex cursor-pointer flex-col items-center gap-2"
          onClick={() => navigate("/")}
        >
          <IoCompassOutline
            size={36}
            color={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
          />
          <p
            className={
              pathMatchRoute("/") ? "text-[#2c2c2c]" : "text-[#8f8f8f]"
            }
          >
            Explore
          </p>
        </li>

        <li
          className="flex cursor-pointer flex-col items-center gap-2"
          onClick={() => navigate("/offers")}
        >
          <GoTag
            size={36}
            color={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
          />
          <p
            className={
              pathMatchRoute("/offers") ? "text-[#2c2c2c]" : "text-[#8f8f8f]"
            }
          >
            Offers
          </p>
        </li>

        <li
          className="flex cursor-pointer flex-col items-center gap-2"
          onClick={() => navigate("/profile")}
        >
          <CgProfile
            size={36}
            color={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
          />
          <p
            className={
              pathMatchRoute("/profile") ? "text-[#2c2c2c]" : "text-[#8f8f8f]"
            }
          >
            Profile
          </p>
        </li>
      </ul>
    </nav>
  );
}
