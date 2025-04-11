"use client"

import { useState, useEffect } from "react"
import { X, HelpCircle, Clock, Tag, FileText, ImageIcon, Plus, Award } from "lucide-react"
import "./index.css"

const QuizDialog = ({ isOpen, onClose, onAddQuiz, initialQuiz = {} }) => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    questionCount: 5,
    timeEstimate: "10 min",
    completionRate: 0,
    imageUrl: "",
    createdAt: new Date().toISOString().split("T")[0],
    ...initialQuiz,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Reset form when dialog opens
    if (isOpen) {
      document.body.style.overflow = "hidden" // Prevent scrolling when dialog is open
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors = {}
    if (!quiz.title.trim()) newErrors.title = "Title is required"
    if (!quiz.description.trim()) newErrors.description = "Description is required"
    if (!quiz.category) newErrors.category = "Category is required"
    if (!quiz.difficulty) newErrors.difficulty = "Difficulty is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setQuiz((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      onAddQuiz(quiz)
      onClose()
    } catch (error) {
      console.error("Error adding quiz:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="quiz-dialog-overlay" onClick={onClose}>
      <div className="quiz-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="quiz-dialog-header">
          <h2>
            <Plus size={20} />
            Create New Quiz
          </h2>
          <button className="close-button" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="quiz-dialog-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">
                <FileText size={16} />
                Quiz Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={quiz.title}
                onChange={handleChange}
                placeholder="Enter quiz title"
                className={errors.title ? "error" : ""}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">
                <Tag size={16} />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={quiz.category}
                onChange={handleChange}
                className={errors.category ? "error" : ""}
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Academic">Academic</option>
                <option value="Workshop">Workshop</option>
                <option value="Webinar">Webinar</option>
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">
                <Award size={16} />
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={quiz.difficulty}
                onChange={handleChange}
                className={errors.difficulty ? "error" : ""}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="questionCount">
                <HelpCircle size={16} />
                Number of Questions
              </label>
              <input
                type="number"
                id="questionCount"
                name="questionCount"
                value={quiz.questionCount}
                onChange={handleChange}
                min="1"
                max="50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeEstimate">
                <Clock size={16} />
                Time Estimate
              </label>
              <input
                type="text"
                id="timeEstimate"
                name="timeEstimate"
                value={quiz.timeEstimate}
                onChange={handleChange}
                placeholder="e.g. 10 min"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="imageUrl">
                <ImageIcon size={16} />
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={quiz.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">
                <FileText size={16} />
                Quiz Description
              </label>
              <textarea
                id="description"
                name="description"
                value={quiz.description}
                onChange={handleChange}
                placeholder="Describe your quiz..."
                rows="4"
                className={errors.description ? "error" : ""}
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>

          <div className="quiz-dialog-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuizDialog
