import { Link } from "react-router-dom"
import { Clock, HelpCircle, Award, ArrowRight, Tag } from "lucide-react"
import "./index.css"

const QuizCard = ({ quiz }) => {
  const { id, title, description, difficulty, questionCount, timeEstimate, completionRate, category, imageUrl } = quiz

  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty.toLowerCase()) {
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

  return (
    <article className="quiz-card">
      <div className="quiz-card__image-container">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="quiz-card__image" />
        <span className={`quiz-card__difficulty ${getDifficultyColor()}`}>{difficulty}</span>
        {category && (
          <span className="quiz-card__category">
            <Tag size={12} />
            {category}
          </span>
        )}
      </div>

      <div className="quiz-card__content">
        <h3 className="quiz-card__title">{title}</h3>
        <p className="quiz-card__description">{description}</p>

        <div className="quiz-card__meta">
          <div className="quiz-card__meta-item">
            <HelpCircle size={16} className="quiz-card__icon" />
            <span>{questionCount} questions</span>
          </div>

          <div className="quiz-card__meta-item">
            <Clock size={16} className="quiz-card__icon" />
            <span>{timeEstimate}</span>
          </div>

          <div className="quiz-card__meta-item">
            <Award size={16} className="quiz-card__icon" />
            <span>{completionRate}% completion</span>
          </div>
        </div>

        <Link to={`/quizzes/${id}`} className="quiz-card__link">
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default QuizCard
