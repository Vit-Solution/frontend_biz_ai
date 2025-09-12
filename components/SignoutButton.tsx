import { useAuthStore } from '@/lib/store/authStore';
import { Button } from './ui/button';

export default function SignoutButton() {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const handleLogout = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    setAuthenticated(false);
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start cursor-pointer"
      onClick={handleLogout}
    >
      Sign out
    </Button>
  );
}
