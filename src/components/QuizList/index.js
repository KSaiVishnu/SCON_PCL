"use client"

import { useState } from "react"
import { HelpCircle, Award, Clock, ArrowRight } from "lucide-react"
import Quiz from "../Quiz"
import "./index.css"

const QuizList = ({ eventId }) => {
  const [activeQuiz, setActiveQuiz] = useState(null)

  // Sample quiz data - in a real app, this would come from an API
  const quizzes = [
    {
      id: 1,
      title: "Event Fundamentals Quiz",
      description: "Test your knowledge about the basic concepts covered in this event.",
      questionCount: 5,
      timeEstimate: "5 min",
      difficulty: "Beginner",
      questions: [
        {
          question: "What is the primary purpose of this event?",
          answers: [
            "Networking with professionals",
            "Learning new technologies",
            "Finding job opportunities",
            "Showcasing projects",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which technology is NOT covered in this event?",
          answers: ["React", "Angular", "Vue", "Svelte"],
          correctAnswer: 3,
        },
        {
          question: "How long does the average workshop session last?",
          answers: ["30 minutes", "1 hour", "2 hours", "3 hours"],
          correctAnswer: 2,
        },
        {
          question: "What should you bring to the hands-on sessions?",
          answers: ["Just yourself", "Your laptop", "Printed materials", "Previous projects"],
          correctAnswer: 1,
        },
        {
          question: "Which of these is a best practice for participating in this event?",
          answers: [
            "Working alone on all exercises",
            "Skipping the introduction",
            "Asking questions during Q&A",
            "Leaving early to avoid traffic",
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Advanced Concepts Assessment",
      description: "Challenge yourself with questions about advanced topics from this event.",
      questionCount: 5,
      timeEstimate: "8 min",
      difficulty: "Advanced",
      questions: [
        {
          question: "Which design pattern was discussed as a solution for state management?",
          answers: ["Observer Pattern", "Singleton", "Factory Method", "Decorator"],
          correctAnswer: 0,
        },
        {
          question: "What is the main advantage of the architecture presented in the advanced session?",
          answers: [
            "Simplicity of implementation",
            "Scalability and maintainability",
            "Reduced build time",
            "Smaller bundle size",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which tool was recommended for performance profiling?",
          answers: ["Chrome DevTools", "Lighthouse", "React Profiler", "All of the above"],
          correctAnswer: 3,
        },
        {
          question: "What was identified as the most common cause of memory leaks?",
          answers: ["Circular references", "Uncleared event listeners", "Large image assets", "Third-party libraries"],
          correctAnswer: 1,
        },
        {
          question: "Which deployment strategy was recommended for high-traffic applications?",
          answers: ["Big bang deployment", "Blue-green deployment", "Canary releases", "Shadow deployment"],
          correctAnswer: 2,
        },
      ],
    },
  ]

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <div className="quiz-list-title">
          <HelpCircle size={24} />
          <h2>Knowledge Check Quizzes</h2>
        </div>
        <p className="quiz-list-description">
          Test your understanding of the event content with these interactive quizzes.
        </p>
      </div>

      {activeQuiz ? (
        <>
          <Quiz eventId={eventId} quizData={quizzes.find((q) => q.id === activeQuiz)} />
          <button className="back-to-quizzes" onClick={() => setActiveQuiz(null)}>
            ← Back to all quizzes
          </button>
        </>
      ) : (
        <div className="quiz-cards">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <div className="quiz-card-header">
                <h3>{quiz.title}</h3>
                <span className={`difficulty-badge ${quiz.difficulty.toLowerCase()}`}>{quiz.difficulty}</span>
              </div>

              <p className="quiz-description">{quiz.description}</p>

              <div className="quiz-meta">
                <div className="quiz-meta-item">
                  <HelpCircle size={16} />
                  <span>{quiz.questionCount} questions</span>
                </div>
                <div className="quiz-meta-item">
                  <Clock size={16} />
                  <span>{quiz.timeEstimate}</span>
                </div>
                <div className="quiz-meta-item">
                  <Award size={16} />
                  <span>Certificate</span>
                </div>
              </div>

              <button className="start-quiz-button" onClick={() => setActiveQuiz(quiz.id)}>
                Start Quiz
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuizList
