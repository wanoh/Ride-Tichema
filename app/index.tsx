import { useState } from "react"
import { Redirect } from "expo-router"




export default function index() {

    const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <Redirect href={!isLoggedIn ? "/(routes)/onboarding" : "/(tabs)/home"} />
  )
}