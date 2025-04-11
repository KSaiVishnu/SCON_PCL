"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Clock, Award, ArrowRight, RotateCcw } from "lucide-react"
import "./index.css"

const Quiz = ({ eventId, quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answerStatus, setAnswerStatus] = useState(null) // 'correct', 'incorrect', or null

  // Reset timer when moving to a new question
  useEffect(() => {
    if (showResult) return

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
  }, [currentQuestion, showResult, selectedAnswer])

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex)

    const isCorrect = answerIndex === quizData.questions[currentQuestion].correctAnswer
    setAnswerStatus(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setAnswerStatus(null)
        setTimeLeft(30)
      } else {
        setShowResult(true)
        setQuizCompleted(true)
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
    return ((currentQuestion + 1) / quizData.questions.length) * 100
  }

  if (!quizData) {
    return <div className="quiz-loading">Loading quiz...</div>
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizData.title}</h2>
        {!showResult && (
          <div className="quiz-progress">
            <div className="progress-text">
              Question {currentQuestion + 1}/{quizData.questions.length}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {!showResult ? (
        <div className="quiz-content">
          <div className="timer-container">
            <Clock size={18} />
            <div className="timer">{timeLeft}s</div>
          </div>

          <div className="question-container">
            <h3>{quizData.questions[currentQuestion].question}</h3>

            <div className="answers-container">
              {quizData.questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer-button ${selectedAnswer === index ? "selected" : ""} ${
                    answerStatus && selectedAnswer === index
                      ? index === quizData.questions[currentQuestion].correctAnswer
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
                      {index === quizData.questions[currentQuestion].correctAnswer ? (
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
      ) : (
        <div className="quiz-results">
          <div className="results-header">
            <Award size={48} className="results-icon" />
            <h3>Quiz Completed!</h3>
            <p className="score-text">
              Your Score: <span className="score">{score}</span>/{quizData.questions.length}
            </p>
            <div className="score-percentage">{Math.round((score / quizData.questions.length) * 100)}% Correct</div>
          </div>

          <div className="results-message">
            {score === quizData.questions.length ? (
              <p>Perfect score! You're an expert!</p>
            ) : score >= quizData.questions.length * 0.7 ? (
              <p>Great job! You know your stuff!</p>
            ) : score >= quizData.questions.length * 0.5 ? (
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
            <button className="next-button">
              View Certificate
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
