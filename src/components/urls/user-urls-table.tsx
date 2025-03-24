"use client";

import { Copy, Edit, ExternalLink, QrCode, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { deleteUrl } from "@/server/actions/urls/delete-url";
import { QRCodeModal } from "../modals/qr-code-modal";
import { EditUrlModal } from "../modals/edit-url-modal";

interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

interface UserUrlsTableProps {
  urls: Url[];
}

export function UserUrlsTable({ urls }: UserUrlsTableProps) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [localUrls, setLocalUrls] = useState<Url[]>(urls);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [qrCodeShortCode, setQrCodeShortCode] = useState<string>("");
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [urlToEdit, setUrlToEdit] = useState<{
    id: number;
    shortCode: string;
  } | null>(null);

  const copyToClipboard = async (shortCode: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shortUrl = `${baseUrl}/r/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied to clipboard", {
        description: "The short URL has been copied to your clipboard",
      });
    } catch (error) {
      console.error("Failed to copy short URL to clipboard", error);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(id);

    try {
      const response = await deleteUrl(id);
      if (response.success) {
        setLocalUrls((prev) => prev.filter((url) => url.id !== id));
        toast.success("URL deleted successfully", {
          description: "The URL has been deleted successfully",
        });
      } else {
        toast.error("Failed to delete URL", {
          description: response.error || "An error occurred",
        });
      }
    } catch (error) {
      console.error("Failed to delete URL", error);
      toast.error("Failed to delete URL", {
        description: "An error occurred",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const showQrCode = (shortCode: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shortUrl = `${baseUrl}/r/${shortCode}`;
    setQrCodeUrl(shortUrl);
    setQrCodeShortCode(shortCode);
    setIsQrCodeModalOpen(true);
  };

  const handleEdit = (id: number, shortCode: string) => {
    setUrlToEdit({ id, shortCode });
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (newShortCode: string) => {
    if (!urlToEdit) return;

    // update the short code in the local state
    setLocalUrls((prev) =>
      prev.map((url) =>
        url.id === urlToEdit.id ? { ...url, shortCode: newShortCode } : url
      )
    );
  };

  if (localUrls.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          You haven&apos;t created any short URLs yet. Click the button below to
          create your first short URL.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Original URL</th>
              <th className="text-left py-3 px-4 font-medium">Short URL</th>
              <th className="text-left py-3 px-4 font-medium">Clicks</th>
              <th className="text-left py-3 px-4 font-medium">Created At</th>
              <th className="text-left py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localUrls.map((url) => {
              const baseUrl =
                process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
              const shortUrl = `${baseUrl}/r/${url.shortCode}`;

              return (
                <tr key={url.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className="max-w-xs truncate"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
                      </div>
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="truncate" title={shortUrl}>
                        {shortUrl}
                      </div>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => copyToClipboard(url.shortCode)}
                        className="ml-2 size-8"
                      >
                        <Copy className="size-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {url.clicks}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {formatDistanceToNow(new Date(url.createdAt), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end">
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => showQrCode(url.shortCode)}
                        className="size-8 text-primary hover:text-primary"
                      >
                        <QrCode className="size-4" />
                      </Button>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => handleEdit(url.id, url.shortCode)}
                        className="size-8 text-primary hover:text-primary"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => handleDelete(url.id)}
                        disabled={isDeleting === url.id}
                        className="size-8 text-destructive hover:text-destructive"
                      >
                        {isDeleting === url.id ? (
                          <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Trash2Icon className="size-4" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <QRCodeModal
        isOpen={isQrCodeModalOpen}
        onOpenChange={setIsQrCodeModalOpen}
        url={qrCodeUrl}
        shortCode={qrCodeShortCode}
      />

      {urlToEdit && (
        <EditUrlModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          urlId={urlToEdit.id}
          currentShortCode={urlToEdit.shortCode}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
