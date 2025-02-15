import { UploadButton } from "@/utils/uploadthing";
import { Camera } from "lucide-react";

interface CVButtonProps {
  onClientUploadComplete?: (res: any) => void;
  onUploadError?: (error: Error) => void;
}

//test comment
export default function CVButton({ onClientUploadComplete, onUploadError }: CVButtonProps) {
  return (
    <UploadButton
      endpoint="cvUploader"
      onClientUploadComplete={(res) => {
       // console.log("Files: ", res);
        alert("CV Uploaded");
        if (onClientUploadComplete) onClientUploadComplete(res);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
        if (onUploadError) onUploadError(error);
      }}
      appearance={{
        button: "flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
        allowedContent: "hidden",
      }}
      content={{
        button({ ready }) {
          return (
            <>
              <Camera className="w-5 h-5 mr-2" />
              {ready ? "Upload CV" : "Loading..."}
            </>
          );
        },
      }}
    />
  );
}