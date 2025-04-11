import { Link } from "react-router-dom"
import { Calendar, Users, ArrowRight } from "lucide-react"
import "./index.css"

const EventCard = ({ event }) => {
  const { id, title, imageUrl, date, time, registeredCount, isLive } = event

  // Format date for better display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="event-card">
      <div className="event-card__image-container">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="event-card__image" />
        {isLive && <span className="event-card__live-badge">LIVE</span>}
      </div>

      <div className="event-card__content">
        <h3 className="event-card__title">{title}</h3>

        <div className="event-card__meta">
          <div className="event-card__meta-item">
            <Calendar size={16} className="event-card__icon" />
            <span>{formattedDate}</span>
          </div>

          <div className="event-card__meta-item">
            <Users size={16} className="event-card__icon" />
            <span>{registeredCount} registered</span>
          </div>
        </div>

        <Link to={`/events/${id}`} className="event-card__link">
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default EventCard
