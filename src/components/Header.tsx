
import { useEffect, useState } from "react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("token","")
    Cookies.remove("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    router.push("/")
  };

  return (
      <header className="bg-background border-b flex items-center justify-between px-4 py-3 sm:px-6 bg-black text-orange-600">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-orange-600">
            <Link href="/about" className="text-sm font-medium text-muted-foreground text-orange-600 hover:text-foreground" prefetch={false}>
              About
            </Link>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
             <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-white text-orange-600">Team</Link> 
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem className="text-orange-600">new team</DropdownMenuItem>
              <DropdownMenuItem className="text-orange-600">all teams</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            {!isAuthenticated ? (

              <>
                <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground" prefetch={false}>
                  Sign in
                </Link>
                <Link href="/sign-up" className="text-sm font-medium text-muted-foreground hover:text-foreground" prefetch={false}>
                  Sign up
                </Link>
              </>
            ) : (<>
              <DropdownMenu>
            <DropdownMenuTrigger asChild>
             <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-white text-orange-600">Wallet</Link> 
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
             <div className="h-32 w-32 sm:h-max sm:w-max ">
                    {/* Wallet Balance  : $100 */}
                    <div className="text-green-500 text-sm ml-64 mr-2">verified</div>
                    <h1 className="text-2xl font-bold ml-16 mr-16">Balance : $100  </h1>
                    <Input placeholder="UPI id" className="mt-6 "  />
                    <Input placeholder="amount" className="mt-6 "  />
                    <Button className="text-black ml-10 bg-slate-300 m-2"> Deposite </Button>
                    <Button className="text-black ml-10 bg-slate-300 m-2"> Withdraw </Button>

             </div>
            </DropdownMenuContent>
          </DropdownMenu>
                </>)}
          </nav>
        </div>
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>Wallet</DropdownMenuItem>
              <DropdownMenuItem>Raise Ticket</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
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

function XIcon(props: any) {
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
