import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link  from 'next/link'
import { XIcon } from './Header'

interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  mobileNumber: string;
  bgmiId: string;
}

const TournamentModel = ({ value ,...props} : any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(value)
  const [formData, setFormData] = useState<SignUpFormData>({
    userName: '',
    email: '',
    password: '',
    mobileNumber: '',
    bgmiId: ''
  });

  const handleToggle = ()=>{
  
    setToggle(!toggle);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
    
  return (
    <> 
   
    <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm  justify-center items-center ${!toggle ? "" : "hidden"}` } >
    <XIcon  className = "ml-[1440px] mt-7 font-bold " onClick = {handleToggle}/>
         <ToastContainer />
        
      <div className="mx-auto w-full max-w-md space-y-6 bg-black p-8 border ">
        <div className="text-center">
          <div className='flex'>

          <h1 className="text-3xl font-bold tracking-tight text-foreground text-orange-600">Launch The Tournament  </h1>
         
          </div>
          <p className="mt-2 text-muted-foreground">Enter your Tournament details below</p>
        </div>
        <form className="space-y-4" >
          <div>
            <Label htmlFor="userName">Title</Label>
            <Input id="title" type="text" placeholder="Enter your Title" value={formData.userName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="mode">Mode</Label>
            <Input id="mode" type="text" placeholder="Enter your mode" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="map">Map</Label>
            </div>
            <Input id="map" type="text" placeholder="Enter your map" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="Winning price">Winning price</Label>
            <Input id="Winningprice" type="text" placeholder="Enter your Winning price" value={formData.mobileNumber} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="Eligibility">Eligibility</Label>
            <Input id="Eligibility" type="text" placeholder="Enter your Eligibility" value={formData.bgmiId} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="launchDate">launchDate</Label>
            <Input id="Eligibility" type="Date" placeholder="Enter your Eligibility" value={formData.bgmiId} onChange={handleChange} required />
          </div>
          
          <Button type="submit" className="w-full text-orange-600">
           {loading ? `Signing up...` : `Sign up`} 
          </Button>
        </form>
      </div>
    </div>
    </>
  )
}

export default TournamentModel