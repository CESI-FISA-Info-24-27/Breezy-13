"use client";

import AdminPosts from "../comp/AdminPosts";
import AdminUsers from "../comp/AdminUsers";
import AdminRoles from "../comp/AdminRoles";
import AdminComments from "../comp/AdminComments";
import AdminStats from "../comp/AdminStats";
import React from "react";

export default function AdminPage() {
  return (
    <section className="min-h-screen bg-seasalt flex flex-col">
      <header className="w-full bg-celestial-blue py-6 shadow">
        <h1 className="text-4xl font-extrabold text-seasalt text-center tracking-tight drop-shadow">
          Tableau de bord administrateur
        </h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-7xl mb-8">
          <AdminStats />
        </div>
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <AdminUsers />
          <AdminPosts />
          <AdminRoles />
          <AdminComments />
        </div>
      </main>
    </section>
  );
}