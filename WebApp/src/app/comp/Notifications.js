<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
import Follows from './Follows';
import NotificationsList from './NotificationsList';

export default function Notifications() {
<<<<<<< HEAD
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <Follows showDetails={showDetails} setShowDetails={setShowDetails} />
      {!showDetails && (
        <>
          <hr className="w-14/15 mx-auto h-0.5 border-0 bg-sea-green my-5 rounded" />
          <NotificationsList />
        </>
      )}
=======
  return (
    <div>
      <Follows />
      <hr className="w-14/15 mx-auto h-0.5 border-0 bg-sea-green my-5 rounded" />
      <NotificationsList />
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
    </div>
  );
}