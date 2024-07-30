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

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
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
              <DropdownMenuItem>New Team</DropdownMenuItem>
              <DropdownMenuItem>All Teams</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {!isAuthenticated ? (
            <>
              <Link href="/sign-in" className="text-sm font-medium text-gray-200 hover:text-foreground" prefetch={false}>
                Sign in
              </Link>
              <Link href="/sign-up" className="text-sm font-medium text-gray-200 hover:text-foreground" prefetch={false}>
                Sign up
              </Link>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="#" className="text-sm font-medium text-gray-200 hover:text-white">Wallet</Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <div className="h-32 w-32 sm:h-max sm:w-max">
                    <div className="text-green-500 text-sm ml-2">Verified</div>
                    <h1 className="text-2xl font-bold text-center">Balance: $100</h1>
                    <Input placeholder="UPI id" className="mt-2" />
                    <Input placeholder="Amount" className="mt-2" />
                    <Button className="text-black bg-slate-300 m-2">Deposit</Button>
                    <Button className="text-black bg-slate-300 m-2">Withdraw</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/launch-tournament" className="text-sm font-medium text-gray-200 hover:text-white">Launch </Link>
            </>
          )}
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