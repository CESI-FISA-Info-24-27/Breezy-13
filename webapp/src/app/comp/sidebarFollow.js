"use client";

import { useEffect, useState } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";

export default function SideBarFollow() {
//  const [follows, setFollows] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/follows")
//       .then((res) => res.json())
//       .then((data) => setFollows(data))
//       .catch((err) => console.error(err));
//   }, []);

  return (
    <div className="fixed right-0 top-0 h-screen z-50 w-64">
      <Sidebar>
        <SidebarItems>
          <div className="font-bold mb-2 text-seasalt">Comptes suivis</div>
          
          {//Fonction pour récupérer les followers d'un compte utilisateur, à garder jusqu'à implémentation
          /* <SidebarItemGroup>
            {follows.length === 0 && (
              <SidebarItem>Vous ne suivez personne.</SidebarItem>
            )}
            {follows.map((follow) => (
              <SidebarItem key={follow._id || `${follow.follower_id}-${follow.following_id}`}>
                {follow.following_id}
              </SidebarItem>
            ))}
          </SidebarItemGroup> */}
        </SidebarItems>
      </Sidebar>
    </div>
  );
}