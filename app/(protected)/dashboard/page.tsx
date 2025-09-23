import { signOut } from "@/utils/auth/action";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
