import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { atomWithStorage } from 'jotai/utils'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000"
})

export const nameAtom = atomWithStorage("name", "")
