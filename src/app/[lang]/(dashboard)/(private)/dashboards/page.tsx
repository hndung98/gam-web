'use client'

import { useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session, status } = useSession()
  const calledRef = useRef(false)

  const testMode = false

  useEffect(() => {
    if (!calledRef.current && status === 'authenticated' && session?.idToken) {
      calledRef.current = true

      if (!testMode)
        fetch('http://localhost:5000/api/v1/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: session.idToken })
        })
          .then(res => res.json())
          .then(data => {
            console.log('JWT từ NestJS:', data)

            // localStorage.setItem('access_token', data.access_token)
          })
    }

    console.log({ status, session })
  }, [status, session, testMode])

  return (
    <>
      <h2>Dashboards Page</h2>
    </>
  )
}
