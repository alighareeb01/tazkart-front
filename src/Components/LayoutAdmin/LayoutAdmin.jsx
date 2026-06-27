import React from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <Outlet />
    </div>
  );
}
