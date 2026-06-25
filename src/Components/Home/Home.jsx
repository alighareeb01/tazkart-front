import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Book your event
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Welcome to our site, please visit our events →
            <Link to="/events" className="underline">
              events
            </Link>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="text-gray-400"> Not registerd yet?</p>
            <Link
              to="/signup"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              signup
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p className="text-gray-400"> you have an account already</p>
            <Link
              to="/login"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
