import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const role = useSelector((state) => state.logged.role);

  if (role === "admin") {
    return (
      <div className="min-h-screen bg-gray-800 pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-semibold text-white">
            Welcome back, Admin
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            Manage your events, bookings and users from here.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-white text-xl font-semibold">Create Event</h2>

              <p className="text-gray-400 mt-2">Add a new event for users.</p>

              <Link
                to="/create-event"
                className="inline-block mt-5 bg-indigo-600 px-4 py-2 rounded-md text-white"
              >
                Create
              </Link>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-white text-xl font-semibold">
                Manage Events
              </h2>

              <p className="text-gray-400 mt-2">
                Edit or delete existing events.
              </p>

              <Link
                to="/events"
                className="inline-block mt-5 bg-gray-700 px-4 py-2 rounded-md text-white"
              >
                Events
              </Link>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-white text-xl font-semibold">Bookings</h2>

              <p className="text-gray-400 mt-2">Check user bookings.</p>

              <Link
                to="/bookings"
                className="inline-block mt-5 bg-gray-700 px-4 py-2 rounded-md text-white"
              >
                View
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <p className="text-gray-400">Total Events</p>
              <h3 className="text-4xl mt-2">12</h3>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <p className="text-gray-400">Total Bookings</p>
              <h3 className="text-4xl mt-2">45</h3>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <p className="text-gray-400">Users</p>
              <h3 className="text-4xl mt-2">200</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold   text-white sm:text-7xl">
            BOOK YOUR EVENT
          </h1>
          <p className="mt-8 text-lg font-medium  text-white sm:text-xl/8">
            Welcome to our site, please visit our events →{" "}
            <Link
              to="/events"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:text-white"
            >
              events
            </Link>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="text-white"> Not registerd yet?</p>
            <Link
              to="/signup"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:text-white"
            >
              signup
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="text-white"> you have an account already</p>
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
