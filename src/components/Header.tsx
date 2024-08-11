import { useEffect, useState } from "react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import scrims from "../../public/scrims.jpg"

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userFirstLetter,setUserFirstLetter] = useState("")
  const router = useRouter();


  const getUser = async(token : string)=>{
    const response = await axios.post('/api/teams/get-user',{token})
    // console.log(response.data.data[0].userName[0]);
    
    setUserFirstLetter(response.data.data[0].userName[0])
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
     getUser(token)  
    }
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("token", "");
    Cookies.remove("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <header className="bg-black text-orange-600 border-b flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          {/* <MountainIcon className="h-6 w-6" /> */}
          <div>
            <img src="https://utfs.io/f/b20ac6fe-f3d3-4df6-998a-2084302d59e6-apa690.png" alt="" width={100} height={100}/>
          </div>
          <span className="sr-only text-orange-600">Acme Inc</span>
        </Link>
        <button 
          className="md:hidden text-orange-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <GiHamburgerMenu className="h-6 w-6" />}
        </button>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex items-center space-x-4 text-orange-600`}>
          <Link href="/about" className="text-sm font-medium text-gray-200 hover:text-white" prefetch={false}>
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="#" className="text-sm font-medium text-gray-200 hover:text-white">Team</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <Link href = "create-team">
                <DropdownMenuItem>New Team</DropdownMenuItem>
              </Link>
              <Link href = "/all-teams">
              <DropdownMenuItem>All Teams</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          {!isAuthenticated ? (
            <>
              <Link href="/sign-in" className="text-sm font-medium text-gray-200 hover:text-white" prefetch={false}>
                Sign in
              </Link>
              <Link href="/sign-up" className="text-sm font-medium text-gray-200 hover:text-white" prefetch={false}>
                Sign up
              </Link>
            </>
          ) : (
            <>

              <Link href="/launch-tournament" className="text-sm font-medium text-gray-200 hover:text-white">Launch </Link>
            </>
          )}
        </nav>
      </div>
      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9">
              <AvatarFallback>{userFirstLetter.toUpperCase()}</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href = {"/profile"}>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            </Link>
            <Link href = {"/contact"}>
            <DropdownMenuItem>Raise Ticket</DropdownMenuItem>
            </Link>
            <Link href = {"/start-tournament"}>
            <DropdownMenuItem>Start Tournament</DropdownMenuItem>
            </Link>

            {/* <DropdownMenuItem>Wallet</DropdownMenuItem> */}
            {/* <DropdownMenuItem Link={"/contact"}>Raise Ticket</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}


export function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}