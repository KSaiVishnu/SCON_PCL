"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Users, ImageIcon, FileText, Tag, Plus } from "lucide-react"
import "./index.css"

const EventDialog = ({ isOpen, onClose, onAddEvent, initialEvent = {} }) => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    registeredCount: 0,
    category: "",
    overview: "",
    imageUrl: "",
    isLive: false,
    ...initialEvent,
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
    if (!event.title.trim()) newErrors.title = "Title is required"
    if (!event.date) newErrors.date = "Date is required"
    if (!event.time) newErrors.time = "Time is required"
    if (!event.category) newErrors.category = "Category is required"
    if (!event.overview.trim()) newErrors.overview = "Overview is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setEvent((prev) => ({
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
      onAddEvent({ ...event, id: Date.now() })
      onClose()
    } catch (error) {
      console.error("Error adding event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="event-dialog-overlay" onClick={onClose}>
      <div className="event-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="event-dialog-header">
          <h2>
            <Plus size={20} />
            Add New Event
          </h2>
          <button className="close-button" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-dialog-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">
                <FileText size={16} />
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={event.title}
                onChange={handleChange}
                placeholder="Enter event title"
                className={errors.title ? "error" : ""}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">
                <Calendar size={16} />
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                className={errors.date ? "error" : ""}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="time">
                <Clock size={16} />
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={event.time}
                onChange={handleChange}
                className={errors.time ? "error" : ""}
              />
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="registeredCount">
                <Users size={16} />
                Initial Registrations
              </label>
              <input
                type="number"
                id="registeredCount"
                name="registeredCount"
                value={event.registeredCount}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">
                <Tag size={16} />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={event.category}
                onChange={handleChange}
                className={errors.category ? "error" : ""}
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Academic">Academic</option>
                <option value="Cultural">Cultural</option>
                <option value="Workshop">Workshop</option>
                <option value="Webinar">Webinar</option>
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
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
                value={event.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="overview">
                <FileText size={16} />
                Event Overview
              </label>
              <textarea
                id="overview"
                name="overview"
                value={event.overview}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows="4"
                className={errors.overview ? "error" : ""}
              ></textarea>
              {errors.overview && <span className="error-message">{errors.overview}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="isLive" className="checkbox-label">
                <input type="checkbox" id="isLive" name="isLive" checked={event.isLive} onChange={handleChange} />
                <span className="checkbox-text">Mark as Live Event</span>
              </label>
            </div>
          </div>

          <div className="event-dialog-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventDialog
