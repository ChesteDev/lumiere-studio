import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPicsumUrl(w: number, h: number, seed: number = 1) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`
}
