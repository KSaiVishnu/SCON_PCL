"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Plus, BookOpen, CheckCircle, HelpCircle } from "lucide-react"
import Header from "../Header"
import EventCategories from "../EventCategories"
import QuizCard from "../QuizCard"
import QuizDialog from "../QuizDialog"
import "./index.css"

// Sample quiz data - in a real app, this would come from an API
const quizzesData = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Test your knowledge of React basics including components, props, and state.",
    category: "Tech",
    difficulty: "Beginner",
    questionCount: 10,
    timeEstimate: "15 min",
    completionRate: 78,
    imageUrl: "https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_23-2149226910.jpg?uid=R192748755&ga=GA1.1.290244527.1711381461&semt=ais_hybrid&w=740",
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    description: "Challenge yourself with questions about closures, prototypes, and async programming.",
    category: "Tech",
    difficulty: "Advanced",
    questionCount: 15,
    timeEstimate: "25 min",
    completionRate: 45,
    imageUrl: "https://img.freepik.com/free-photo/programming-background-collage_23-2149901770.jpg?uid=R192748755&ga=GA1.1.290244527.1711381461&semt=ais_hybrid&w=740",
    createdAt: "2023-06-20",
  },
  {
    id: 3,
    title: "CSS Grid & Flexbox",
    description: "Test your layout skills with modern CSS techniques.",
    category: "Tech",
    difficulty: "Intermediate",
    questionCount: 8,
    timeEstimate: "12 min",
    completionRate: 65,
    imageUrl: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010127.jpg?uid=R192748755&ga=GA1.1.290244527.1711381461&semt=ais_hybrid&w=740",
    createdAt: "2023-07-10",
  },
  {
    id: 4,
    title: "Data Science Basics",
    description: "Introduction to data science concepts and terminology.",
    category: "Academic",
    difficulty: "Beginner",
    questionCount: 12,
    timeEstimate: "20 min",
    completionRate: 82,
    imageUrl: "https://img.freepik.com/free-photo/man-using-tablet-work-connect-with-others_23-2149369110.jpg?uid=R192748755&ga=GA1.1.290244527.1711381461&semt=ais_hybrid&w=740",
    createdAt: "2023-08-05",
  },
  {
    id: 5,
    title: "Machine Learning Algorithms",
    description: "Test your knowledge of common ML algorithms and their applications.",
    category: "Academic",
    difficulty: "Advanced",
    questionCount: 15,
    timeEstimate: "30 min",
    completionRate: 38,
    imageUrl: "https://img.freepik.com/premium-photo/futuristic-robot-artificial-intelligence-concept_31965-6304.jpg?uid=R192748755&ga=GA1.1.290244527.1711381461&semt=ais_hybrid&w=740",
    createdAt: "2023-09-12",
  },
  {
    id: 6,
    title: "Public Speaking Essentials",
    description: "Test your knowledge of effective presentation techniques.",
    category: "Workshop",
    difficulty: "Intermediate",
    questionCount: 10,
    timeEstimate: "15 min",
    completionRate: 72,
    imageUrl: "https://img.freepik.com/free-photo/male-business-executive-giving-speech_107420-63822.jpg?uid=R192748755&ga=GA1.1.290244527.1711381461&semt=ais_hybrid&w=740",
    createdAt: "2023-10-08",
  },
]

const Quizzes = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredQuizzes, setFilteredQuizzes] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [quizzes, setQuizzes] = useState(quizzesData)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get categories with counts
  const categories = [...new Set(quizzes.map((quiz) => quiz.category))]
    .filter(Boolean)
    .map((category) => ({
      name: category,
      count: quizzes.filter((quiz) => quiz.category === category).length,
    }))
    .sort((a, b) => b.count - a.count)

  // Filter quizzes based on search term, category, and tab
  useEffect(() => {
    let filtered = [...quizzes]

    // Filter by tab
    if (activeTab === "completed") {
      // In a real app, this would filter based on user's completed quizzes
      filtered = filtered.filter((quiz) => Math.random() > 0.5) // Simulating completed quizzes
    } else if (activeTab === "inProgress") {
      // In a real app, this would filter based on user's in-progress quizzes
      filtered = filtered.filter((quiz) => Math.random() > 0.7) // Simulating in-progress quizzes
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((quiz) => quiz.category === selectedCategory)
    }

    setFilteredQuizzes(filtered)
  }, [searchTerm, activeTab, selectedCategory, quizzes])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAddQuiz = (newQuiz) => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, { ...newQuiz, id: Date.now() }])
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="quizzes-page">
      <Header />

      <main className="quizzes-container">
        <div className="quizzes-header">
          <h1 className="quizzes-title">Knowledge Quizzes</h1>

          <div className="quizzes-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="quizzes-layout">
          <aside className="quizzes-sidebar">
            <EventCategories
              categories={categories}
              onSelectCategory={handleCategorySelect}
              activeCategory={selectedCategory}
            />

            <div style={{ flexGrow: 1 }}></div>

            <button className="add-quiz-button" onClick={() => setShowDialog(true)}>
              <Plus size={18} />
              <span>Create New Quiz</span>
            </button>
          </aside>

          <div className="quizzes-main">
            <div className="quizzes-tabs">
              <button
                className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                <BookOpen size={18} />
                <span>All Quizzes</span>
              </button>

              <button
                className={`tab-button ${activeTab === "inProgress" ? "active" : ""}`}
                onClick={() => setActiveTab("inProgress")}
              >
                <HelpCircle size={18} />
                <span>In Progress</span>
              </button>

              <button
                className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
                onClick={() => setActiveTab("completed")}
              >
                <CheckCircle size={18} />
                <span>Completed</span>
              </button>

              <button className="filter-button">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>

            {filteredQuizzes.length === 0 ? (
              <div className="no-quizzes">
                <p>No quizzes found. Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="quizzes-grid">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <QuizDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onAddQuiz={handleAddQuiz} />
    </div>
  )
}

export default Quizzes
