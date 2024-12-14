'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, leaderboard } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  const userTotalScore = Object.values(user.quizScores).reduce((sum, score) => sum + score, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <img src="/placeholder.svg?height=100&width=100" alt={user.username} className="w-20 h-20 rounded-full mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-lg font-semibold mt-2">Total Score: {userTotalScore}</p>
            </div>
          </div>
          <button className="btn-primary">Edit Profile</button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">Username</th>
                <th className="text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className={user.username === entry.username ? 'bg-orange-100' : ''}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{Object.values(entry.quizScores).reduce((sum, score) => sum + score, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  )
}

