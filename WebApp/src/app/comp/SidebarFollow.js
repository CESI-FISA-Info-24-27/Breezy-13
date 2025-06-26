"use client";
import { useState, useEffect } from "react";
import { getFollowsFrom } from "../../services/FollowsServices"
import { getUsers } from "../../services/UsersServices"
import SecureMedia from "../comp/SecureMedia"

const pagination = 5;

export default function SideBarFollow(props) {

	const [follows, setFollows] = useState([]);
	const [hasFollowersToFetch, setHasFollowersToFetch] = useState(true);

	const fetchFollows = async () => 
	{
		try 
		{
			// On récupère les followers
			let fetchedFollows = await getFollowsFrom("685c057e357c56a7155326aa");
			// On récupère les ids des followers
			let usersID = fetchedFollows.map(item => item.follower);

			let existingFollowersID = follows.map(user => user._id);
			let filteredUsersID = usersID.filter(id => !existingFollowersID.includes(id)).slice(0, pagination);
			if (filteredUsersID.length > 0)
			{
				// On met à jour si on peut continuer la pagination
				setHasFollowersToFetch(true);

				// On récupère les infos sur ces utilisateurs
				let newUsers = await getUsers({ id: filteredUsersID });
				setFollows(prev => [...prev, ...newUsers]);
			}
			else
			{
				setHasFollowersToFetch(false);
			}
		} 
		catch (error) 
		{
		console.error("Erreur lors du chargement des follows :", error);
		}
	};

	useEffect(() => { fetchFollows(); }, []);

	return (
		<aside
		className="fixed right-0 z-50 w-64 bg-[var(--color-celestial-blue)] shadow-lg flex flex-col px-4 py-6 transition-all duration-300"
		style={props.style}
		>
		<div className="mb-4">
			<h2 className="text-xl font-extrabold text-[var(--color-seasalt)] tracking-tight">Comptes suivis</h2>
				<hr className="w-14/15 mx-auto h-0.5 border-0 bg-seasalt my-5 rounded" />
		</div>
		<ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
		{follows.length === 0 ? (
			<li className="text-[var(--color-seasalt)] text-sm opacity-70">Vous ne suivez personne.</li>
		) : (
			<>
			{follows.map((follow) =>
				(<li key={follow._id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--color-seasalt)]/10 text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20 transition font-medium">
					<SecureMedia fileName={follow.avatar} type="image" alt="avatar" className="w-8 h-8 rounded-full object-cover border" />
					<span className="truncate">{follow.username}</span>
				</li>
			))}
			{hasFollowersToFetch && (
				<li>
					<button className="w-full mt-4 px-4 py-2 rounded bg-folly text-seasalt font-semibold hover:bg-sea-green transition" onClick={fetchFollows}>
						Afficher plus
					</button>
				</li>
			)}
			</>
		)}
		</ul>
		</aside>
	);
}
