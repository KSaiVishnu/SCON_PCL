// "use client"

// import { useState, useEffect } from "react"
// import { Search, Calendar, CalendarCheck} from "lucide-react"
// import EventCard from "../EventCard"
// import eventsData from "../../data/eventsData"
// import Header from "../Header"
// import "./index.css"

// const Events = () => {
//   const [activeTab, setActiveTab] = useState("upcoming")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const [filteredEvents, setFilteredEvents] = useState([])

//   const today = new Date()

//   useEffect(() => {
//     // Filter by tab (upcoming/past)
//     const tabFiltered = activeTab === "upcoming"
//       ? eventsData.filter((e) => new Date(e.date) >= today)
//       : eventsData.filter((e) => new Date(e.date) < today)

//     // Filter by category
//     const categoryFiltered = selectedCategory
//       ? tabFiltered.filter(event => event.category === selectedCategory)
//       : tabFiltered

//     // Filter by search term
//     const searchFiltered = searchTerm.trim() === ""
//       ? categoryFiltered
//       : categoryFiltered.filter((event) =>
//           event.title.toLowerCase().includes(searchTerm.toLowerCase())
//         )

//     setFilteredEvents(searchFiltered)
//   }, [searchTerm, selectedCategory, activeTab])

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value)
//   }

  

//   return (
//     <div className="events-page">
//       <Header />

//       <main className="events-container">
//         <div className="events-header">
//           <h1 className="events-title">Events</h1>

//           <div className="events-search">
//             <Search size={18} className="search-icon" />
//             <input
//               type="search"
//               placeholder="Search events..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="search-input"
//             />
//           </div>
//         </div>

//         <div className="events-tabs">
//           <button
//             className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
//             onClick={() => setActiveTab("upcoming")}
//           >
//             <Calendar size={18} />
//             <span>Upcoming & Live</span>
//           </button>

//           <button className={`tab-button ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
//             <CalendarCheck size={18} />
//             <span>Past Events</span>
//           </button>

//           {/* <button className="filter-button">
//             <Filter size={18} />
//             <span>Filter</span>
//           </button> */}
//                   <select
//           className="category-select"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Tech">Technology</option>
//           <option value="Academic">Academic</option>
//           <option value="Cultural">Cultural</option>
//         </select>
//         </div>

//         {filteredEvents.length === 0 ? (
//           <div className="no-events">
//             <p>No events found. Try adjusting your search and category.</p>
//           </div>
//         ) : (
//           <div className="events-grid">
//             {filteredEvents.map((event) => (
//               <EventCard key={event.id} event={event} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default Events







// "use client"

// import { useState, useEffect } from "react"
// import { Search, Calendar, CalendarCheck, Plus } from "lucide-react"
// import EventCard from "../EventCard"
// import eventsData from "../../data/eventsData"
// import Header from "../Header"
// import "./index.css"
// import { useNavigate } from "react-router-dom"

// const Events = () => {
//   const [activeTab, setActiveTab] = useState("upcoming")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const [filteredEvents, setFilteredEvents] = useState([])
//   const [showDialog, setShowDialog] = useState(false)
//   const [events, setEvents] = useState(eventsData)

//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     date: '',
//     time: '',
//     registeredCount: 0,
//     isLive: false,
//     isRegistered: false,
//     category: '',
//     overview: '',
//     imageUrl: ''
//   })

//   const navigate = useNavigate()


//     const today = new Date()

//   useEffect(() => {
//     // const tabFiltered = activeTab === "upcoming"
//     //   ? eventsData.filter((e) => new Date(e.date) >= today)
//     //   : eventsData.filter((e) => new Date(e.date) < today)

//   //   const tabFiltered = activeTab === "upcoming"
//   // ? events.filter((e) => new Date(e.date) >= today)
//   // : events.filter((e) => new Date(e.date) < today)


//   const tabFiltered = activeTab === "upcoming"
//   ? events
//       .filter((e) => new Date(e.date) >= today)
//       .sort((a, b) => {
//         if (a.isLive === b.isLive) return new Date(a.date) - new Date(b.date)
//         return b.isLive - a.isLive // Live first
//       })
//   : events
//       .filter((e) => new Date(e.date) < today)
//       .sort((a, b) => new Date(b.date) - new Date(a.date)) // optional: newest past event first



//     const categoryFiltered = selectedCategory
//       ? tabFiltered.filter(event => event.category === selectedCategory)
//       : tabFiltered

//     const searchFiltered = searchTerm.trim() === ""
//       ? categoryFiltered
//       : categoryFiltered.filter((event) =>
//           event.title.toLowerCase().includes(searchTerm.toLowerCase())
//         )

//     setFilteredEvents(searchFiltered)
//   }, [searchTerm, selectedCategory, activeTab])

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value)
//   }

// //   const handleAddEvent = () => {
// //     const newId = eventsData.length + 1
// //     eventsData.push({ id: newId, ...newEvent })
// //     setShowDialog(false)
// //     setNewEvent({
// //       title: '',
// //       date: '',
// //       time: '',
// //       registeredCount: 0,
// //       isLive: false,
// //       isRegistered: false,
// //       category: '',
// //       overview: '',
// //       imageUrl: ''
// //     })
// //   }

// const handleAddEvent = () => {
//     const newId = events.length + 1
//     const newEventWithId = { id: newId, ...newEvent }
//     setEvents((prev) => [...prev, newEventWithId])
//     setShowDialog(false)
//     setNewEvent({
//       title: '',
//       date: '',
//       time: '',
//       registeredCount: 0,
//       isLive: false,
//       isRegistered: false,
//       category: '',
//       overview: '',
//       imageUrl: ''
//     })
//   }
  


//   const handleEventClick = (event) => {
//     navigate(`/events/${event.id}`)
//   }
  
//   const renderEventStatus = (event) => {
//     if (new Date(event.date) > today) {
//       return event.isLive ? "Live" : "Upcoming"
//     }
//     return "Past"
//   }

//   return (
//     <div className="events-page">
//       <Header />

//       <main className="events-container">
//         <div className="events-header">
//           <h1 className="events-title">Events</h1>

//           <div className="events-search">
//             <Search size={18} className="search-icon" />
//             <input
//               type="search"
//               placeholder="Search events..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="search-input"
//             />
//           </div>

//           <button className="add-event-button" onClick={() => setShowDialog(true)}>
//             <Plus size={18} /> Add Event
//           </button>
//         </div>

//         <div className="events-tabs">
//           <button
//             className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
//             onClick={() => setActiveTab("upcoming")}
//           >
//             <Calendar size={18} />
//             <span>Upcoming & Live</span>
//           </button>

//           <button
//             className={`tab-button ${activeTab === "past" ? "active" : ""}`}
//             onClick={() => setActiveTab("past")}
//           >
//             <CalendarCheck size={18} />
//             <span>Past Events</span>
//           </button>

//           <select
//             className="category-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All</option>
//             <option value="Tech">Technology</option>
//             <option value="Academic">Academic</option>
//             <option value="Cultural">Cultural</option>
//           </select>
//         </div>

//         {filteredEvents.length === 0 ? (
//           <div className="no-events">
//             <p>No events found. Try adjusting your search and category.</p>
//           </div>
//         ) : (
//           <div className="events-grid">
//             {filteredEvents.map((event) => (
//               <div key={event.id}>
//                 <EventCard event={event} status={renderEventStatus(event)} />
//               </div>
//             ))}
//           </div>
//         )}

//         {showDialog && (
//           <div className="dialog-overlay">
//             <div className="dialog-box">
//               <h2>Add New Event</h2>
//               <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
//               <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
//               <input type="text" placeholder="Time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
//               <input type="number" placeholder="Registered Count" value={newEvent.registeredCount} onChange={(e) => setNewEvent({ ...newEvent, registeredCount: parseInt(e.target.value) })} />
//               <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
//                 <option value="">Select Category</option>
//                 <option value="Tech">Tech</option>
//                 <option value="Academic">Academic</option>
//                 <option value="Cultural">Cultural</option>
//               </select>
//               <textarea placeholder="Overview" value={newEvent.overview} onChange={(e) => setNewEvent({ ...newEvent, overview: e.target.value })}></textarea>
//               <input type="text" placeholder="Image URL" value={newEvent.imageUrl} onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })} />
//               <div className="dialog-actions">
//                 <button onClick={handleAddEvent}>Submit</button>
//                 <button onClick={() => setShowDialog(false)}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default Events












"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, CalendarCheck, Filter, Plus } from "lucide-react"
import EventCard from "../EventCard"
import EventDialog from "../EventDialog"
import EventCategories from "../EventCategories"
import eventsData from "../../data/eventsData"
import Header from "../Header"
import "./index.css"

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEvents, setFilteredEvents] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [events, setEvents] = useState(eventsData)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const today = new Date()

  // Get upcoming and past events
  const upcomingEvents = events.filter((e) => new Date(e.date) >= today)
  const pastEvents = events.filter((e) => new Date(e.date) < today)

  // Get categories with counts
  const categories = [...new Set(events.map((event) => event.category))]
    .filter(Boolean)
    .map((category) => ({
      name: category,
      count: events.filter((event) => event.category === category).length,
    }))
    .sort((a, b) => b.count - a.count)

  // Filter events based on search term and category
  useEffect(() => {
    let eventsToFilter = activeTab === "upcoming" ? [...upcomingEvents] : [...pastEvents]
  
    // Sort live events first for upcoming
    if (activeTab === "upcoming") {
      eventsToFilter.sort((a, b) => {
        if (a.isLive === b.isLive) return 0
        return a.isLive ? -1 : 1
      })
    }
  
    let filtered = eventsToFilter
  
    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }
  
    setFilteredEvents(filtered)
  }, [searchTerm, activeTab, upcomingEvents, pastEvents, selectedCategory, events])
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="events-page">
      <Header />

      <main className="events-container">
        <div className="events-header">
          <h1 className="events-title">Events</h1>

          <div className="events-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="events-layout">
          <aside className="events-sidebar">
            <EventCategories
              categories={categories}
              onSelectCategory={handleCategorySelect}
              activeCategory={selectedCategory}
            />

            <div style={{ flexGrow: 1 }}></div>

            <button className="add-event-button" onClick={() => setShowDialog(true)}>
              <Plus size={18} />
              <span>Add New Event</span>
            </button>
          </aside>

          <div className="events-main">
            <div className="events-tabs">
              <button
                className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveTab("upcoming")}
              >
                <Calendar size={18} />
                <span>Upcoming & Live</span>
              </button>

              <button
                className={`tab-button ${activeTab === "past" ? "active" : ""}`}
                onClick={() => setActiveTab("past")}
              >
                <CalendarCheck size={18} />
                <span>Past Events</span>
              </button>

              <button className="filter-button">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="no-events">
                <p>No events found. Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <EventDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onAddEvent={handleAddEvent} />
    </div>
  )
}

export default Events

