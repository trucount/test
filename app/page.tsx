import Header from '../components/Header'
import Footer from '../components/Footer'
import QuizCard from '../components/QuizCard'
import quizzes from '../../data/quizzes.json'

export default function Quizzes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

