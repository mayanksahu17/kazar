import { Label } from "@/components/ui/label";
import { UseFormReturn } from 'react-hook-form';
import CVButton from "@/components/buttons/cv-upload-button"

interface CVProps {
  form: UseFormReturn<any>;
  profileIndex: number;
}

export default function CV({ form, profileIndex }: CVProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor={`profiles.${profileIndex}.cv.resume`}>Resume/CV</Label>
        <CVButton
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              form.setValue(`profiles.${profileIndex}.cv.resume`, res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error);
          }}
        />
        <p className="text-sm text-gray-500 mt-2">
          Accepted formats: <strong>PDF, DOC, DOCX</strong>. Max file size: <strong>10MB</strong>
        </p>
      </div>
    </div>
  );
}