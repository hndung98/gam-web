'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const testMode = true

  useEffect(() => {
    console.log({ status, session })

    if (status === 'authenticated' && session?.idToken && testMode) {
      fetch('http://localhost:5000/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: session.idToken })
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/dashboard')
        })
    }
  }, [status, session, router, testMode])

  return <p>Đang xử lý đăng nhập...</p>
}
