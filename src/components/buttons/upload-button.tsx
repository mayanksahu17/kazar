import { UploadButton } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";

//test comment
interface UploadPhotoButtonProps {
  onClientUploadComplete?: (res: any) => void;
  onUploadError?: (error: Error) => void;
}

export default function UploadPhotoButton({ onClientUploadComplete, onUploadError }: UploadPhotoButtonProps) {
  return (
    <UploadButton
      endpoint="profilePictureUploader"
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      appearance={{
        button: "px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        allowedContent: "hidden",
      }}
      content={{
        button({ ready }) {
          return ready ? "Upload Photo" : "Loading...";
        },
      }}
    />
  );
}