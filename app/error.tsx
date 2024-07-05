"use client"
import * as Internal from "@/features/500/conponents/Index";
import { useEffect } from 'react';

export default function InternalPage({error} : {error: Error & { digest?: string }}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  
  return (
    <Internal.InternalWrapper />
  );
}