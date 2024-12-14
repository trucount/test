'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  id: number
  username: string
  email: string
  quizScores: { [quizId: number]: number }
  likedVideos: number[]
  achievements: string[];
  level: number;
  xp: number;
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (username: string, email: string, password: string) => Promise<void>
  updateQuizScore: (quizId: number, score: number) => void
  toggleVideoLike: (videoId: number) => void
  leaderboard: User[]
  addAchievement: (achievement: string) => void;
  addXP: (xp: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [leaderboard, setLeaderboard] = useState<User[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    updateLeaderboard()
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    const mockUser = { 
      id: 1, 
      username: 'testuser', 
      email,
      quizScores: {},
      likedVideos: [],
      achievements: [],
      level: 1,
      xp: 0,
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    updateLeaderboard()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    updateLeaderboard()
  }

  const signup = async (username: string, email: string, password: string) => {
    // In a real app, you would make an API call here
    const mockUser = { 
      id: Date.now(), 
      username, 
      email,
      quizScores: {},
      likedVideos: [],
      achievements: [],
      level: 1,
      xp: 0,
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    updateLeaderboard()
  }

  const updateQuizScore = (quizId: number, score: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        quizScores: {
          ...user.quizScores,
          [quizId]: Math.max(score, user.quizScores[quizId] || 0)
        }
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      updateLeaderboard()
    }
  }

  const toggleVideoLike = (videoId: number) => {
    if (user) {
      const updatedLikedVideos = user.likedVideos.includes(videoId)
        ? user.likedVideos.filter(id => id !== videoId)
        : [...user.likedVideos, videoId]
      
      const updatedUser = {
        ...user,
        likedVideos: updatedLikedVideos
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const updateLeaderboard = () => {
    // In a real app, you would fetch this data from an API
    const mockLeaderboard = [
      { id: 1, username: 'user1', email: 'user1@example.com', quizScores: { 1: 100, 2: 90 }, likedVideos: [1, 2], achievements: ['achievement1'], level: 5, xp: 5000 },
      { id: 2, username: 'user2', email: 'user2@example.com', quizScores: { 1: 95, 2: 85 }, likedVideos: [2, 3], achievements: ['achievement2'], level: 4, xp: 4000 },
      { id: 3, username: 'user3', email: 'user3@example.com', quizScores: { 1: 90, 2: 80 }, likedVideos: [1, 3], achievements: ['achievement3'], level: 3, xp: 3000 },
      { id: 4, username: 'user4', email: 'user4@example.com', quizScores: { 1: 85, 2: 75 }, likedVideos: [4], achievements: ['achievement4'], level: 2, xp: 2000 },
      { id: 5, username: 'user5', email: 'user5@example.com', quizScores: { 1: 80, 2: 70 }, likedVideos: [1, 2, 3], achievements: ['achievement5'], level: 1, xp: 1000 },
    ]
    if (user) {
      const userIndex = mockLeaderboard.findIndex(u => u.id === user.id)
      if (userIndex === -1) {
        mockLeaderboard.push(user)
      } else {
        mockLeaderboard[userIndex] = user
      }
    }
    mockLeaderboard.sort((a, b) => 
      Object.values(b.quizScores).reduce((sum, score) => sum + score, 0) - 
      Object.values(a.quizScores).reduce((sum, score) => sum + score, 0)
    )
    setLeaderboard(mockLeaderboard)
  }

  const addAchievement = (achievement: string) => {
    if (user && !user.achievements.includes(achievement)) {
      const updatedUser = {
        ...user,
        achievements: [...user.achievements, achievement]
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const addXP = (xp: number) => {
    if (user) {
      const newXP = user.xp + xp
      const newLevel = Math.floor(newXP / 1000) + 1
      const updatedUser = {
        ...user,
        xp: newXP,
        level: newLevel
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, updateQuizScore, toggleVideoLike, leaderboard, addAchievement, addXP }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

