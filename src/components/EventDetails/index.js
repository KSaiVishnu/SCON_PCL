// "use client"

// import { useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import { Calendar, Clock, Users, Share2, ChevronDown, ChevronUp, Check, AlertCircle, ArrowLeft } from "lucide-react"
// import Header from "../Header"
// import EventCountdown from "../EventCountdown"
// import eventsData from "../../data/eventsData"
// import "./index.css"

// const EventDetails = () => {
//   const { id } = useParams()
//   const event = eventsData.find((e) => e.id === Number.parseInt(id))
//   const [expandedFaq, setExpandedFaq] = useState(null)
//   const [formData, setFormData] = useState({ name: "", email: "" })
//   const [formSubmitted, setFormSubmitted] = useState(false)

//   if (!event)
//     return (
//       <div className="event-not-found">
//         <AlertCircle size={48} />
//         <h2>Event not found</h2>
//         <Link to="/events" className="back-link">
//           <ArrowLeft size={16} /> Back to Events
//         </Link>
//       </div>
//     )

//   const toggleFaq = (index) => {
//     setExpandedFaq(expandedFaq === index ? null : index)
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Simulate form submission
//     setTimeout(() => {
//       setFormSubmitted(true)
//     }, 800)
//   }

//   const shareEvent = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: event.title,
//         text: `Check out this event: ${event.title}`,
//         url: window.location.href,
//       })
//     } else {
//       // Fallback for browsers that don't support the Web Share API
//       navigator.clipboard.writeText(window.location.href)
//       alert("Link copied to clipboard!")
//     }
//   }

//   // Format date for better display
//   const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   })

//   const faqs = [
//     { question: "Is this event free?", answer: "Yes, all events are free." },
//     { question: "How do I join?", answer: "Details will be shared on registration." },
//     { question: "Can I cancel my registration?", answer: "Yes, you can cancel anytime before the event starts." },
//     { question: "Will the event be recorded?", answer: "Yes, recordings will be available for registered users." },
//   ]

//   return (
//     <div className="event-details-page">
//       <Header />

//       <main className="event-details-container">
//         <div className="event-details-header">
//           <Link to="/events" className="back-button">
//             <ArrowLeft size={18} />
//             <span>Back to Events</span>
//           </Link>

//           <button className="share-button" onClick={shareEvent}>
//             <Share2 size={18} />
//             <span>Share</span>
//           </button>
//         </div>

//         <div className="event-hero">
//           <div className="event-image-container">
//             <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="event-image" />
//             {event.isLive && <span className="live-badge">LIVE NOW</span>}
//           </div>

//           <div className="event-info">
//             <h1 className="event-title">{event.title}</h1>

//             <div className="event-meta">
//               <div className="meta-item">
//                 <Calendar size={18} className="meta-icon" />
//                 <span>{formattedDate}</span>
//               </div>

//               <div className="meta-item">
//                 <Clock size={18} className="meta-icon" />
//                 <span>{event.time}</span>
//               </div>

//               <div className="meta-item">
//                 <Users size={18} className="meta-icon" />
//                 <span>{event.registeredCount} registered</span>
//               </div>
//             </div>

//             {!event.isLive && new Date(event.date) > new Date() && (
//               <EventCountdown date={event.date} time={event.time} />
//             )}
//           </div>
//         </div>

//         <div className="event-content">
//           <div className="event-main">
//             <section className="event-section">
//               <h2>Overview</h2>
//               <p>{event.overview}</p>
//             </section>

//             <section className="event-section">
//               <h2>How It Works</h2>
//               <ul className="how-it-works-list">
//                 <li>
//                   <div className="step-number">1</div>
//                   <div className="step-content">
//                     <h4>Register</h4>
//                     <p>Fill out the registration form</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="step-number">2</div>
//                   <div className="step-content">
//                     <h4>Confirmation</h4>
//                     <p>Receive confirmation email with details</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="step-number">3</div>
//                   <div className="step-content">
//                     <h4>Join</h4>
//                     <p>Join the event at the scheduled time</p>
//                   </div>
//                 </li>
//               </ul>
//             </section>

//             <section className="event-section">
//               <h2>Frequently Asked Questions</h2>
//               <div className="faq-list">
//                 {faqs.map((faq, index) => (
//                   <div key={index} className={`faq-item ${expandedFaq === index ? "expanded" : ""}`}>
//                     <button className="faq-question" onClick={() => toggleFaq(index)}>
//                       <span>{faq.question}</span>
//                       {expandedFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//                     </button>

//                     {expandedFaq === index && (
//                       <div className="faq-answer">
//                         <p>{faq.answer}</p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           <div className="event-sidebar">
//             <div className="registration-card">
//               <h3>Register for this Event</h3>

//               {formSubmitted ? (
//                 <div className="registration-success">
//                   <div className="success-icon">
//                     <Check size={24} />
//                   </div>
//                   <h4>Registration Successful!</h4>
//                   <p>Check your email for event details.</p>
//                 </div>
//               ) : (
//                 <form className="registration-form" onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="name">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <button type="submit" className="register-button">
//                     Register Now
//                   </button>

//                   <p className="form-disclaimer">
//                     By registering, you agree to our Terms of Service and Privacy Policy.
//                   </p>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default EventDetails










"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Calendar,
  Clock,
  Users,
  Share2,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle,
  ArrowLeft,
  Tag,
} from "lucide-react"
import Header from "../Header"
import EventCountdown from "../EventCountdown"
import QuizList from "../QuizList"
import eventsData from "../../data/eventsData"
import "./index.css"

const EventDetails = () => {
  const { id } = useParams()
  const event = eventsData.find((e) => e.id === Number.parseInt(id))
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  if (!event)
    return (
      <div className="event-not-found">
        <AlertCircle size={48} />
        <h2>Event not found</h2>
        <Link to="/events" className="back-link">
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>
    )

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 800)
  }

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Format date for better display
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const faqs = [
    { question: "Is this event free?", answer: "Yes, all events are free." },
    { question: "How do I join?", answer: "Details will be shared on registration." },
    { question: "Can I cancel my registration?", answer: "Yes, you can cancel anytime before the event starts." },
    { question: "Will the event be recorded?", answer: "Yes, recordings will be available for registered users." },
  ]

  return (
    <div className="event-details-page">
      <Header />

      <main className="event-details-container">
        <div className="event-details-header">
          <Link to="/events" className="back-button">
            <ArrowLeft size={18} />
            <span>Back to Events</span>
          </Link>

          <button className="share-button" onClick={shareEvent}>
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        <div className="event-hero">
          <div className="event-image-container">
            <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="event-image" />
            {event.isLive && <span className="live-badge">LIVE NOW</span>}
            {event.category && (
              <span className="category-badge">
                <Tag size={14} />
                {event.category}
              </span>
            )}
          </div>

          <div className="event-info">
            <h1 className="event-title">{event.title}</h1>

            <div className="event-meta">
              <div className="meta-item">
                <Calendar size={18} className="meta-icon" />
                <span>{formattedDate}</span>
              </div>

              <div className="meta-item">
                <Clock size={18} className="meta-icon" />
                <span>{event.time}</span>
              </div>

              <div className="meta-item">
                <Users size={18} className="meta-icon" />
                <span>{event.registeredCount} registered</span>
              </div>
            </div>

            {!event.isLive && new Date(event.date) > new Date() && (
              <EventCountdown date={event.date} time={event.time} />
            )}
          </div>
        </div>

        <div className="event-tabs">
          <button
            className={`event-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`event-tab ${activeTab === "quizzes" ? "active" : ""}`}
            onClick={() => setActiveTab("quizzes")}
          >
            Knowledge Quizzes
          </button>
        </div>

        <div className="event-content">
          {activeTab === "overview" ? (
            <>
              <div className="event-main">
                <section className="event-section">
                  <h2>Overview</h2>
                  <p>{event.overview}</p>
                </section>

                <section className="event-section">
                  <h2>How It Works</h2>
                  <ul className="how-it-works-list">
                    <li>
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Register</h4>
                        <p>Fill out the registration form</p>
                      </div>
                    </li>
                    <li>
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Confirmation</h4>
                        <p>Receive confirmation email with details</p>
                      </div>
                    </li>
                    <li>
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Join</h4>
                        <p>Join the event at the scheduled time</p>
                      </div>
                    </li>
                  </ul>
                </section>

                <section className="event-section">
                  <h2>Frequently Asked Questions</h2>
                  <div className="faq-list">
                    {faqs.map((faq, index) => (
                      <div key={index} className={`faq-item ${expandedFaq === index ? "expanded" : ""}`}>
                        <button className="faq-question" onClick={() => toggleFaq(index)}>
                          <span>{faq.question}</span>
                          {expandedFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {expandedFaq === index && (
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="event-sidebar">
                <div className="registration-card">
                  <h3>Register for this Event</h3>

                  {formSubmitted ? (
                    <div className="registration-success">
                      <div className="success-icon">
                        <Check size={24} />
                      </div>
                      <h4>Registration Successful!</h4>
                      <p>Check your email for event details.</p>
                    </div>
                  ) : (
                    <form className="registration-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <button type="submit" className="register-button">
                        Register Now
                      </button>

                      <p className="form-disclaimer">
                        By registering, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </>
          ) : (
            <QuizList eventId={id} />
          )}
        </div>
      </main>
    </div>
  )
}

export default EventDetails
