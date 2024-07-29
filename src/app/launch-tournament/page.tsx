"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const TournamentModel = ({ value, ...props }: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const router = useRouter()
  const [formData, setFormData] = useState({
    token : "",
    title: '',
    mode: '',
    map: '',
    winningPrice: '',
    eligibility: '',
    owner: '',
    launchDate: '',
    requiredTeamSize: '',
    entryPrice: '',
    thumbnail: ''
  })

  const uploadThumbnail = async () => {
    if (!image) return null

    try {
      const formData = new FormData()
      formData.append('Image', image)

      const response = await axios.post(
        'https://printovert-backend.onrender.com/api/v1/users/cloudinary/v2/upload/outService',
        formData
      )

      setImageUrl(response.data.URL)
      return response.data.URL
    } catch (error) {
      toast.error('Failed to upload image.')
      return null
    } 
  }

  const handleCancel = () => {
    router.push('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0])
      }
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const thumbnailUrl = await uploadThumbnail()
      let token = localStorage.getItem('token') || ""
      if (thumbnailUrl) {
        setFormData({
          ...formData ,
          "token" : token })
        const response = await axios.post('/api/createTournament', {
          ...formData,
          thumbnail: thumbnailUrl
        })

        if (response.status === 201) {
          toast.success('Tournament created successfully!')
          router.push('/tournaments') // Redirect to the tournaments page or any other page
        } else {
          toast.error('Failed to create tournament.')
        }
      }
    } catch (error) {
      toast.error('An error occurred while creating the tournament.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-black">
        <ToastContainer />
        <div className="mx-auto w-full max-w-md space-y-6 p-8 border bg-black">
          <div className="text-center">
            <div className="flex">
              <h1 className="text-3xl font-bold tracking-tight text-foreground text-orange-600">Launch The Tournament</h1>
            </div>
            <p className="mt-2 text-muted-foreground">Enter your Tournament details below</p>
          </div>
          <form className="space-y-4 text-orange-600" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" type="text" placeholder="Enter your Title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="mode">Mode</Label>
              <Input id="mode" type="text" placeholder="Enter your mode" value={formData.mode} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="map">Map</Label>
              <Input id="map" type="text" placeholder="Enter your map" value={formData.map} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="winningPrice">Winning Price</Label>
              <Input id="winningPrice" type="text" placeholder="Enter your Winning Price" value={formData.winningPrice} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="eligibility">Eligibility</Label>
              <Input id="eligibility" type="text" placeholder="Enter your Eligibility" value={formData.eligibility} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="owner">Owner</Label>
              <Input id="owner" type="text" placeholder="Enter the owner" value={formData.owner} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="launchDate">Launch Date</Label>
              <Input id="launchDate" type="date" placeholder="Enter your Launch Date" value={formData.launchDate} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="requiredTeamSize">Required Team Size</Label>
              <Input id="requiredTeamSize" type="number" placeholder="Enter the required team size" value={formData.requiredTeamSize} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input id="entryPrice" type="number" placeholder="Enter the Entry Price" value={formData.entryPrice} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input id="thumbnail" type="file" placeholder="Select the Thumbnail" onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full text-orange-600" disabled={loading}>
              {loading ? 'Creating...' : 'Create Tournament'}
            </Button>
            <Button type="button" onClick={handleCancel} className="w-full text-orange-600">
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default TournamentModel
