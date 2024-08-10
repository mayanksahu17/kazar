import { UploadButton } from '@/utils/uploadthings'
import React from 'react'

const ImageUpload = () => {
  return (
    <div>
        <UploadButton endpoint='imageUploader'/>
    </div>
  )
}

export default ImageUpload