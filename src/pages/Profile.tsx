import { getAuth, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);

    // return () => {
    //   second;
    // };
  }, []);

  return user ? (
    <h1 className="text-2xl font-bold">{user.displayName}</h1>
  ) : (
    <h1 className="text-2xl font-bold">Not Logged In</h1>
  );
}
