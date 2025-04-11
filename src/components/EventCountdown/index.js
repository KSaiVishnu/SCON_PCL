"use client"

import { useState, useEffect } from "react"
import "./index.css"

const EventCountdown = ({ date, time }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!date || !time) return;
  
    const [hoursStr, minutesStr] = time.split(":");
    const hours = parseInt(hoursStr, 10) || 0;
    const minutes = parseInt(minutesStr, 10) || 0;
  
    const eventDate = new Date(date);
    eventDate.setHours(hours, minutes, 0, 0);
  
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate - now;
  
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
  
    setTimeLeft(calculateTimeLeft());
  
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(timer);
  }, [date, time]);
  

  return (
    <div className="event-countdown">
      <h3>Event Starts In</h3>

      <div className="countdown-timer">
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.days}</div>
          <div className="countdown-label">Days</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.hours.toString().padStart(2, "0")}</div>
          <div className="countdown-label">Hours</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.minutes.toString().padStart(2, "0")}</div>
          <div className="countdown-label">Minutes</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.seconds.toString().padStart(2, "0")}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default EventCountdown
