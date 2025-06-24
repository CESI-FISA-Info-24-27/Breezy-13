import { useState } from 'react';
import Follows from './Follows';
import NotificationsList from './NotificationsList';

export default function Notifications() {
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
    </div>
  );
}