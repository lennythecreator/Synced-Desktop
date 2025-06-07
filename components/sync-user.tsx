"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { createUser } from "@/lib/users/users.action"

export function UserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && user) {
        try {
          await createUser()
        } catch (error) {
          console.error("Failed to sync user:", error)
        }
      }
    }

    syncUser()
  }, [isLoaded, user])

  return null
}