import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import VideoPlayer from '../../components/VideoPlayer'
import VideoSection from '../../components/VideoSection'
import videos from '../../../data/videos.json'
import RecommendedVideos from '../../components/RecommendedVideos'

export default function VideoDetail({ params }: { params: { id: string } }) {
  const video = videos.find(v => v.id === parseInt(params.id))
  const recommendedVideos = videos.filter(v => v.id !== parseInt(params.id)).slice(0, 4)

  if (!video) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <VideoPlayer videoUrl={video.videoUrl} />
        <p className="mt-4 text-lg">{video.description}</p>
        <RecommendedVideos currentVideoId={video.id} />
      </main>
      <Footer />
    </div>
  )
}

