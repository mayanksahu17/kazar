import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


 export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};


export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(name, value, options);
};