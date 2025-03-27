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
import { useState } from "react";
import { Copy } from "lucide-react"; // Assuming you're using lucide-react for icons

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
  const [copied, setCopied] = useState(false);

  const handleSignup = () => {
    onOpenChange(false);
    router.push("/register");
  };

  const handleSignin = () => {
    onOpenChange(false);
    router.push("/login");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border border-orange-500 sm:max-w-md rounded-xl p-6 shadow-lg shadow-black/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            URL Shortened
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm mt-1">
            Your link is ready. Save and track it with an account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-6 py-6">
          <div className="rounded-lg bg-gray-900/50 border border-gray-800 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-300">Shortened URL</p>
              <p className="mt-2 break-all font-mono text-sm text-orange-500">
                {shortUrl}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 p-2 font-medium text-gray-100 hover:text-orange-600 hover:bg-orange-900/30 transition-colors"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4" />
              <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
            </Button>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-100">
              Unlock with an account:
            </h4>
            <ul className="ml-4 list-none text-sm text-gray-400 space-y-2">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2" />
                Save your links
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2" />
                Track analytics
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2" />
                Customize links
              </li>
            </ul>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            onClick={() => onOpenChange(false)}
          >
            Later
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            onClick={handleSignin}
          >
            Log In
          </Button>
          <Button
            className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-700 transition-colors font-medium"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}