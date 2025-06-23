export default function NotificationsList() {
  // Démo : notifications fictives avec horodatage et user complet
  const notifications = [
    {
      user: {
        avatar: "/elonmuck.png",
        username: "Elonmuck",
        email: "elon@spacex.com",
      },
      action: "a commencé à vous suivre",
      timestamp: "2024-06-10T14:23:00Z",
    },
    {
      user: {
        avatar: "/billgrates.png",
        username: "BillGrates",
        email: "bill@microhard.com",
      },
      action: "a accepté votre demande",
      timestamp: "2024-06-09T09:10:00Z",
    },
    {
      user: {
        avatar: "/arkuni.png",
        username: "Arkuni",
        email: "arkuni@twitch.com",
      },
      action: "a commencé à vous suivre",
      timestamp: "2024-06-01T18:45:00Z",
    },
    {
      user: {
        avatar: "/terracid.png",
        username: "Terracid",
        email: "terracid@yt.com",
      },
      action: "a accepté votre demande",
      timestamp: "2024-05-28T11:30:00Z",
    },
  ];

  function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function NotificationItem({ notif, color = "text-seasalt/80", dateColor = "text-rich-black" }) {
    return (
      <li className={`flex items-center gap-3 ${color}`}>
        <span className="w-8 h-8 rounded-full bg-seasalt/30 flex items-center justify-center font-bold uppercase text-celestial-blue text-base overflow-hidden">
          <img
            src={notif.user.avatar || "/default-avatar.png"}
            alt={notif.user.username}
            className="w-8 h-8 object-cover rounded-full"
          />
        </span>
        <div className="flex flex-col">
          <span className="font-semibold">
            {notif.user.username} <span className="font-normal">{notif.action}</span>
          </span>
          <span className={`text-xs ${dateColor}`}>{formatDate(notif.timestamp)}</span>
        </div>
      </li>
    );
  }

  const thisMonth = notifications.filter(n => new Date(n.timestamp).getMonth() === new Date().getMonth());
  const earlier = notifications.filter(n => new Date(n.timestamp).getMonth() !== new Date().getMonth());

  return (
    <div>
      {thisMonth.length > 0 && (
        <div className="m-6 bg-celestial-blue rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-rich-black text-lg font-bold mb-2">Ce mois-ci</h2>
            <ul className="space-y-2">
              {thisMonth.map((notif, i) => (
                <NotificationItem key={i} notif={notif} dateColor="text-rich-black" />
              ))}
            </ul>
          </div>
        </div>
      )}
      {earlier.length > 0 && (
        <>
          <hr className="border-seasalt/30" />
          <div className="m-6 bg-celestial-blue rounded-lg p-3">
            <div>
              <h2 className="text-rich-black text-lg font-bold mb-2">Plus tôt</h2>
              <ul className="space-y-2">
                {earlier.map((notif, i) => (
                  <NotificationItem key={i} notif={notif} color="text-seasalt" dateColor="text-rich-black" />
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}