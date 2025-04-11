"use client"

import { useState } from "react"
import { Tag, ChevronRight } from "lucide-react"
import "./index.css"

const EventCategories = ({ categories, onSelectCategory, activeCategory }) => {
  const [expanded, setExpanded] = useState(true)

  // Calculate event counts per category
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category.name] = category.count
    return acc
  }, {})

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="event-categories">
      <div className="categories-header" onClick={toggleExpanded}>
        <div className="categories-title">
          <Tag size={18} />
          <h3>Event Categories</h3>
        </div>
        <button className={`expand-button ${expanded ? "expanded" : ""}`}>
          <ChevronRight size={18} />
        </button>
      </div>

      {expanded && (
        <ul className="categories-list">
          <li
            className={`category-item ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => onSelectCategory("all")}
          >
            <span className="category-name">All Events</span>
            <span className="category-count">
              {Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)}
            </span>
          </li>

          {categories.map((category) => (
            <li
              key={category.name}
              className={`category-item ${activeCategory === category.name ? "active" : ""}`}
              onClick={() => onSelectCategory(category.name)}
            >
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EventCategories
