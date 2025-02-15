import { UploadButton } from "@/utils/uploadthing";
import { Camera } from "lucide-react";

interface ChangePhotoButtonProps {
  endpoint: "profilePictureUploader"; // Restrict to allowed endpoints
  onClientUploadComplete?: (res: any) => void;
  onUploadError?: (error: Error) => void;
  disabled?: boolean;
}

export default function ChangePhotoButton({
  endpoint,
  onClientUploadComplete,
  onUploadError,
  disabled,
}: ChangePhotoButtonProps) {
  const handleButtonClick = () => {
   // console.log("ChangePhotoButton clicked! Waiting for upload...");
  };

  return (
    <div className="flex items-center gap-2">
      <div
        onClick={handleButtonClick} // Wrap the button to handle the click
        className="inline-flex"
      >
        <UploadButton
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            console.log("Upload complete callback triggered:", res); // Debug log
            if (onClientUploadComplete) onClientUploadComplete(res);
          }}
          onUploadError={(error: Error) => {
            console.error("Upload error in ChangePhotoButton:", error); // Debug log
            if (onUploadError) onUploadError(error);
          }}
          appearance={{
            button:
              "px-3 py-2 text-black bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
            allowedContent: "hidden",
          }}
          content={{
            button({ ready }) {
             // console.log("Button is rendering, ready state:", ready); // Debug log
              return (
                <>
                  <Camera className="w-3 h-3 mr-1" />
                  {ready ? "Change Photo" : "Loading..."}
                </>
              );
            },
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
