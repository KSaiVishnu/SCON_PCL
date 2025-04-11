// EventsWrapper.js
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Events from '../Events'

const EventsWrapper = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return <Events navigate={navigate} location={location} />
}

export default EventsWrapper
