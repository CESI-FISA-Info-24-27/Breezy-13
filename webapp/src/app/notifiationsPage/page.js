import React from "react";
import MyNavbar from "../comp/navbar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed left-0 top-0 h-screen w-64 z-40">
        <MyNavbar />
      </div>
    </div>
  );
}