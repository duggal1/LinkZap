import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface SignupSuggestionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  shortUrl: string;
}

export function SignupSuggestionDialog({
  isOpen,
  onOpenChange,
  shortUrl,
}: SignupSuggestionDialogProps) {
  const router = useRouter();

  const handleSignup = () => {
    onOpenChange(false);
    router.push("/register");
  };

  const handleSignin = () => {
    onOpenChange(false);
    router.push("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>URL Shortened Successfully</DialogTitle>
          <DialogDescription>
            Your link has been shortened and is ready to use. Want to save and
            track this link?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm font-medium">Your shortened URL</p>
            <p className="mt-1 break-all font-mono text-sm">{shortUrl}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Create an account to:</h4>
            <ul className="ml-4 list-disc text-sm space-y-1">
              <li>Save all your shortened links</li>
              <li>Track link analytics</li>
              <li>Customize your shortened links</li>
            </ul>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant={"outline"}
            className="sm:w-auto w-full"
            onClick={() => onOpenChange(false)}
          >
            Maybe Later
          </Button>
          <Button
            variant={"outline"}
            className="sm:w-auto w-full"
            onClick={handleSignin}
          >
            Log In
          </Button>
          <Button className="sm:w-auto w-full" onClick={handleSignup}>
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
