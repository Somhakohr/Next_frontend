import { useEffect, useState } from "react"
import "react-tabs/style/react-tabs.css"
import "react-loading-skeleton/dist/skeleton.css"
import shallow from "zustand/shallow"
import { useStore } from "../../constants/code"

export default function JobIndex(props) {
  const { router, session } = props

  const [userType, updateUserType] = useStore(
    state => [state.userType, state.updateUserType],
    shallow
  )

  useEffect(() => {
    if (session && userType) {
      router.push(`/marketplace/${userType.toLowerCase()}/`)
    } else {
      router.push("/marketplace/jobs")
    }
  }, [session, userType])

  return <></>
}
