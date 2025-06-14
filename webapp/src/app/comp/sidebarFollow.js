export default function SideBarFollow() {
  // Remettre la logique de récupération des follows si besoin
  // const [follows, setFollows] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/follows")
  //     .then((res) => res.json())
  //     .then((data) => setFollows(data))
  //     .catch((err) => console.error(err));
  // }, []);

  // Pour la démo, on met des données fictives
  const follows = [
    { _id: "1", username: "eloncuck" },
    { _id: "2", username: "billgrates" },
    { _id: "3", username: "arkuni" },
    { _id: "4", username: "terracist" },
  ];

  return (
    <aside className="fixed right-0 top-0 h-screen z-50 w-64 bg-[var(--color-celestial-blue)] shadow-lg flex flex-col px-4 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-[var(--color-seasalt)] tracking-tight">Comptes suivis</h2>
        <hr className="border-[var(--color-seasalt)] mt-2 mb-4" />
      </div>
      <ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {follows.length === 0 ? (
          <li className="text-[var(--color-seasalt)] text-sm opacity-70">Vous ne suivez personne.</li>
        ) : (
          follows.map((follow) => (
            <li
              key={follow._id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--color-seasalt)]/10 text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20 transition font-medium"
            >
              <span className="w-8 h-8 rounded-full bg-[var(--color-seasalt)]/30 flex items-center justify-center font-bold uppercase text-[var(--color-celestial-blue)]">
                {follow.username[0]}
              </span>
              <span className="truncate">{follow.username}</span>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}