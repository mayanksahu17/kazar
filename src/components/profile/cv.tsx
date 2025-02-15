'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Save, X, FileText, Upload } from 'lucide-react'
import { UploadButton } from "@/utils/uploadthing"

interface CVProps {
  data: {
    resume: string;
  }
  onUpdate: (data: { cv: { resume: string } }) => Promise<void>
}

export default function CV({ data, onUpdate }: CVProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [cv, setCV] = useState<string>(data.resume)

  const handleUploadComplete = (res: { url: string }[]) => {
    if (res?.[0]) {
      setCV(res[0].url)
    }
  }

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error)
    // You might want to show an error message to the user here
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onUpdate({ cv: { resume: cv } })
    setIsEditing(false)
  }

  return (
    <Card className="rounded-xl shadow-lg border border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between p-6 bg-neutral-50 rounded-t-xl">
        <CardTitle className="text-xl font-semibold text-neutral-900">CV</CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil className="h-5 w-5 text-neutral-700" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
              <X className="h-5 w-5 text-neutral-700" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSubmit}>
              <Save className="h-5 w-5 text-neutral-700" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit}>
          {cv ? (
            <div className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200">
              <FileText className="h-8 w-8 text-neutral-600" />
              <div className="flex-1">
                <p className="font-medium text-neutral-800">Your CV</p>
                <a href={cv} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                  View uploaded CV
                </a>
              </div>
              {isEditing && (
                <Button variant="ghost" size="icon" onClick={() => setCV('')}>
                  <X className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-neutral-300">
              <Upload className="h-8 w-8 text-neutral-600 mb-4" />
              <p className="text-sm text-neutral-600 mb-2">
                Upload your CV here
              </p>
              {isEditing && (
                <div>
                  <Label htmlFor="cv-upload" className="text-sm font-medium text-neutral-800">
                    Resume/CV
                  </Label>
                  <UploadButton
                    endpoint="cvUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                    className="mt-4"
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    Accepted formats: <strong>PDF, DOC, DOCX</strong>. Max file size: <strong>10MB</strong>
                  </p>
                </div>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}