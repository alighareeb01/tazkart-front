import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { token } = useContext(TokenContext);
  const [err, setErr] = useState("");
  const [data, setData] = useState({});

  const nav = useNavigate();

  useEffect(() => {
    async function getMe() {
      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        setErr(res.message);
      }

      const result = await res.json();

      if (result.status === "fail" || result.status === "error") {
        //   console.log("asdasd",result.);

        setErr(result.message);
        return;
      }
      console.log(result);
      setData(result.data.user);
    }
    getMe();
  }, [token]);

  function getMyBookings() {
    console.log("clicked");

    nav("/bookings");
  }
  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-start pt-10">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src="/download.jpeg"
            alt="profile"
            className="h-28 w-28 rounded-full object-cover border-4 border-indigo-500"
          />

          <h2 className="text-2xl font-bold text-white mt-4">
            {data.firstName} {data.lastName}
          </h2>

          <p className="text-gray-400">{data.email}</p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4 text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-indigo-400">City</span>
            <span>{data.city}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-indigo-400">Gender</span>
            <span>{data.gender}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-indigo-400">Nationality</span>
            <span>{data.nationality}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-indigo-400">Date of birth</span>

            <span>{data.datOfBirth?.split("T")[0]}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-indigo-400">Account</span>

            <span className="text-green-400">Verified ✓</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              nav("/edit");
            }}
            className="
          w-full 
          bg-indigo-500 
          hover:bg-indigo-400 
          text-white 
          py-2 
          rounded-lg 
          transition
          "
          >
            Edit Profile
          </button>
          <button
            onClick={getMyBookings}
            className="
          w-full 
          bg-indigo-500 
          hover:bg-indigo-400 
          text-white 
          py-2 
          rounded-lg 
          transition
          "
          >
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
