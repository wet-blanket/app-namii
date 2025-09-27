import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, UserPlus, UserRoundPlus } from "lucide-react";

export function InvitePeopleForm() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <UserRoundPlus />
          Invite Org Member
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2">
        <SheetHeader>
          <SheetTitle>Create Invite Code</SheetTitle>
          <SheetDescription>
            Generate a unique invite code to share with your team. Use this code
            to let others join quickly and securely.
          </SheetDescription>
        </SheetHeader>
        {/* <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" />
          </div>
        </div> */}
        <SheetFooter>
          <Button type="submit">Create Invite Code</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
