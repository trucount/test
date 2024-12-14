'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, ThumbsUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface VideoPlayerProps {
  videoUrl: string
  videoId: number
}

export default function VideoPlayer({ videoUrl, videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { user, toggleVideoLike } = useAuth()

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleLike = () => {
    toggleVideoLike(videoId)
  }

  const isLiked = user?.likedVideos.includes(videoId)

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex items-center justify-between">
          <button onClick={togglePlay} className="text-white">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={toggleMute} className="text-white">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <button onClick={handleLike} className={`text-white ${isLiked ? 'text-orange-500' : ''}`}>
            <ThumbsUp size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

