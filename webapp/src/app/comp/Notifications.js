import Follows from './Follows';
import NotificationsList from './NotificationsList';

export default function Notifications() {
  return (
    <div>
      <Follows />
      <hr className="w-14/15 mx-auto h-0.5 border-0 bg-sea-green my-5 rounded" />
      <NotificationsList />
    </div>
  );
}