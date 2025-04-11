"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  HelpCircle,
  Clock,
  Award,
  Tag,
  Share2,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react"
import Header from "../Header"
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
    questions: [
      {
        id: 1,
        question: "What is React?",
        answers: [
          "A JavaScript library for building user interfaces",
          "A programming language",
          "A database management system",
          "A server-side framework",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which of the following is used to pass data to a component from outside?",
        answers: ["setState", "render", "props", "propTypes"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is JSX?",
        answers: [
          "A JavaScript extension that allows writing HTML in React",
          "A JavaScript library",
          "A JavaScript framework",
          "A JavaScript compiler",
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: "What is the virtual DOM?",
        answers: [
          "A DOM that doesn't exist",
          "A lightweight copy of the actual DOM",
          "A new browser feature",
          "A type of JavaScript function",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "Which lifecycle method is called after a component is rendered for the first time?",
        answers: ["componentWillMount", "componentDidMount", "componentWillUpdate", "componentDidUpdate"],
        correctAnswer: 1,
      },
    ],
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
    questions: [
      {
        id: 1,
        question: "What is a closure in JavaScript?",
        answers: [
          "A function that has access to variables in its outer lexical environment",
          "A way to close a browser window",
          "A method to end a loop",
          "A type of JavaScript error",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What is the output of: console.log(typeof null)?",
        answers: ["null", "object", "undefined", "number"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which of the following is NOT a JavaScript primitive type?",
        answers: ["string", "boolean", "array", "number"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "What does the 'this' keyword refer to in JavaScript?",
        answers: [
          "It always refers to the global object",
          "It refers to the object that is executing the current function",
          "It refers to the previous function in the call stack",
          "It refers to the parent element in the DOM",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "What is the purpose of the Promise object?",
        answers: [
          "To make a promise to the user",
          "To represent a value that might be available now, or in the future, or never",
          "To promise that a function will execute",
          "To ensure variables are properly declared",
        ],
        correctAnswer: 1,
      },
    ],
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
    questions: [
      {
        id: 1,
        question: "Which CSS module is used to create a two-dimensional layout?",
        answers: ["Flexbox", "CSS Grid", "Box Model", "Float"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which property defines how flex items are placed in a flex container?",
        answers: ["justify-content", "align-items", "flex-wrap", "display"],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "How do you make a container a flexbox?",
        answers: ["display: grid;", "display: inline;", "display: block;", "display: flex;"],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: "What property is used to define the number of columns in a grid layout?",
        answers: ["grid-template-columns", "grid-auto-flow", "column-count", "grid-columns"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "Which property aligns items vertically in a flex container?",
        answers: ["align-items", "justify-content", "align-self", "position"],
        correctAnswer: 0,
      },
    ],
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
    questions: [
      {
        id: 1,
        question: "What is the first step in a data science project?",
        answers: ["Model training", "Data collection", "Feature engineering", "Deployment"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which library is commonly used for data manipulation in Python?",
        answers: ["NumPy", "TensorFlow", "Pandas", "Matplotlib"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What does 'EDA' stand for in Data Science?",
        answers: ["Expert Data Analysis", "Extended Data Application", "Exploratory Data Analysis", "External Data Automation"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "Which algorithm is best for classification problems?",
        answers: ["Linear Regression", "K-Means", "Decision Tree", "PCA"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Which metric is used to evaluate classification models?",
        answers: ["MSE", "R2 Score", "Accuracy", "RMSE"],
        correctAnswer: 2,
      },
    ],
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
    questions: [
      {
        id: 1,
        question: "What type of learning uses labeled data?",
        answers: ["Unsupervised learning", "Reinforcement learning", "Supervised learning", "Semi-supervised learning"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which of the following is a regression algorithm?",
        answers: ["K-Means", "Decision Tree", "Logistic Regression", "Linear Regression"],
        correctAnswer: 3,
      },
      {
        id: 3,
        question: "What is overfitting in machine learning?",
        answers: [
          "Model performs well on training data but poorly on test data",
          "Model performs well on both training and test data",
          "Model fails to learn the training data",
          "Model trains too quickly",
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: "Which metric is NOT typically used for classification evaluation?",
        answers: ["Accuracy", "Precision", "Recall", "Mean Squared Error"],
        correctAnswer: 3,
      },
      {
        id: 5,
        question: "Which algorithm is commonly used for clustering?",
        answers: ["Linear Regression", "K-Means", "Naive Bayes", "Decision Tree"],
        correctAnswer: 1,
      },
    ],
  }
  
]

const QuizDetails = () => {
  const { id } = useParams()
  const quiz = quizzesData.find((q) => q.id === Number(id))

  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question
  const [answerStatus, setAnswerStatus] = useState(null) // 'correct', 'incorrect', or null

  useEffect(() => {
    if (!quizStarted || showResult) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          if (selectedAnswer === null) {
            handleAnswerSelection(null)
          }
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, showResult, selectedAnswer, quizStarted])

  if (!quiz) {
    return (
      <div className="quiz-details-page">
        <Header />
        <main className="quiz-details-container">
          <div className="quiz-not-found">
            <AlertCircle size={48} />
            <h2>Quiz not found</h2>
            <Link to="/quizzes" className="back-link">
              <ArrowLeft size={16} /> Back to Quizzes
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(30)
    setAnswerStatus(null)
  }

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex)

    const isCorrect = answerIndex === quiz.questions[currentQuestion].correctAnswer
    setAnswerStatus(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setAnswerStatus(null)
        setTimeLeft(30)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(30)
    setAnswerStatus(null)
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / quiz.questions.length) * 100
  }

  const getDifficultyColor = () => {
    switch (quiz.difficulty.toLowerCase()) {
      case "beginner":
        return "beginner"
      case "intermediate":
        return "intermediate"
      case "advanced":
        return "advanced"
      default:
        return "beginner"
    }
  }

  const shareQuiz = () => {
    if (navigator.share) {
      navigator.share({
        title: quiz.title,
        text: `Check out this quiz: ${quiz.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="quiz-details-page">
      <Header />

      <main className="quiz-details-container">
        {!quizStarted ? (
          <>
            <div className="quiz-details-header">
              <Link to="/quizzes" className="back-button">
                <ArrowLeft size={18} />
                <span>Back to Quizzes</span>
              </Link>

              <button className="share-button" onClick={shareQuiz}>
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>

            <div className="quiz-hero">
              <div className="quiz-image-container">
                <img src={quiz.imageUrl || "/placeholder.svg"} alt={quiz.title} className="quiz-image" />
                <span className={`quiz-difficulty ${getDifficultyColor()}`}>{quiz.difficulty}</span>
                {quiz.category && (
                  <span className="quiz-category">
                    <Tag size={14} />
                    {quiz.category}
                  </span>
                )}
              </div>

              <div className="quiz-info">
                <h1 className="quiz-title">{quiz.title}</h1>
                <p className="quiz-description">{quiz.description}</p>

                <div className="quiz-meta">
                  <div className="meta-item">
                    <HelpCircle size={18} className="meta-icon" />
                    <span>{quiz.questionCount} questions</span>
                  </div>

                  <div className="meta-item">
                    <Clock size={18} className="meta-icon" />
                    <span>{quiz.timeEstimate}</span>
                  </div>

                  <div className="meta-item">
                    <Award size={18} className="meta-icon" />
                    <span>{quiz.completionRate}% completion rate</span>
                  </div>
                </div>

                <button className="start-quiz-button" onClick={handleStartQuiz}>
                  Start Quiz
                </button>
              </div>
            </div>

            <div className="quiz-details-content">
              <div className="quiz-details-section">
                <h2>About This Quiz</h2>
                <p>
                  This quiz will test your knowledge of {quiz.title}. It consists of {quiz.questionCount} questions and
                  should take approximately {quiz.timeEstimate} to complete. The difficulty level is {quiz.difficulty}.
                </p>
                <p>
                  You'll have 30 seconds to answer each question. Your score will be calculated based on the number of
                  correct answers. Good luck!
                </p>
              </div>

              <div className="quiz-details-section">
                <h2>Instructions</h2>
                <ul className="instructions-list">
                  <li>Read each question carefully before selecting an answer.</li>
                  <li>Once you select an answer, you cannot change it.</li>
                  <li>If you don't answer within the time limit, the question will be marked as incorrect.</li>
                  <li>You'll receive immediate feedback after each question.</li>
                  <li>At the end of the quiz, you'll see your final score and performance summary.</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="quiz-taking-container">
            {!showResult ? (
              <>
                <div className="quiz-header">
                  <button className="quit-button" onClick={() => setQuizStarted(false)}>
                    <ArrowLeft size={16} /> Quit Quiz
                  </button>
                  <h2>{quiz.title}</h2>
                  <div className="quiz-progress">
                    <div className="progress-text">
                      Question {currentQuestion + 1}/{quiz.questions.length}
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="quiz-content">
                  <div className="timer-container">
                    <Clock size={18} />
                    <div className="timer">{timeLeft}s</div>
                  </div>

                  <div className="question-container">
                    <h3>{quiz.questions[currentQuestion].question}</h3>

                    <div className="answers-container">
                      {quiz.questions[currentQuestion].answers.map((answer, index) => (
                        <button
                          key={index}
                          className={`answer-button ${selectedAnswer === index ? "selected" : ""} ${
                            answerStatus && selectedAnswer === index
                              ? index === quiz.questions[currentQuestion].correctAnswer
                                ? "correct"
                                : "incorrect"
                              : ""
                          }`}
                          onClick={() => selectedAnswer === null && handleAnswerSelection(index)}
                          disabled={selectedAnswer !== null}
                        >
                          <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                          <span className="answer-text">{answer}</span>
                          {answerStatus && selectedAnswer === index && (
                            <span className="answer-icon">
                              {index === quiz.questions[currentQuestion].correctAnswer ? (
                                <CheckCircle size={18} />
                              ) : (
                                <XCircle size={18} />
                              )}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="quiz-results">
                <div className="results-header">
                  <Award size={48} className="results-icon" />
                  <h3>Quiz Completed!</h3>
                  <p className="score-text">
                    Your Score: <span className="score">{score}</span>/{quiz.questions.length}
                  </p>
                  <div className="score-percentage">{Math.round((score / quiz.questions.length) * 100)}% Correct</div>
                </div>

                <div className="results-message">
                  {score === quiz.questions.length ? (
                    <p>Perfect score! You're an expert!</p>
                  ) : score >= quiz.questions.length * 0.7 ? (
                    <p>Great job! You know your stuff!</p>
                  ) : score >= quiz.questions.length * 0.5 ? (
                    <p>Good effort! Keep learning!</p>
                  ) : (
                    <p>Nice try! Review the material and try again!</p>
                  )}
                </div>

                <div className="results-actions">
                  <button className="reset-button" onClick={resetQuiz}>
                    <RotateCcw size={16} />
                    Try Again
                  </button>
                  <button className="back-to-quizzes" onClick={() => setQuizStarted(false)}>
                    <ArrowLeft size={16} />
                    Back to Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default QuizDetails
