export default function ProfilPreview() {
    const user = {
        _id: "1",
        username: "eloncuck",
        avatar: "/logo.png",
        mail: "elon@bg.com",
        description: "Achetez mes voitures !"
    };

    return (
        <div className="flex flex-col items-center bg-[var(--color-celestial-blue)] rounded-xl shadow-lg p-6 w-80">
            <span className="w-20 h-20 rounded-full bg-[var(--color-seasalt)]/30 flex items-center justify-center font-bold uppercase text-[var(--color-celestial-blue)] text-3xl mb-4">
                {user.username[0]}
            </span>
            <div className="text-xl font-bold text-[var(--color-seasalt)] mb-1">{user.username}</div>
            <div className="text-sm text-[var(--color-seasalt)]/80 mb-2">{user.mail}</div>
            <div className="text-base text-[var(--color-seasalt)] text-center">{user.description}</div>
        </div>
    );
}