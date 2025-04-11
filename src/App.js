import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobItemDetailsWrapper from "./components/JobItemDetailsWrapper";
import EventsWrapper from "./components/EventsWrapper";
import EventDetails from "./components/EventDetails";

import NotFound from "./components/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import Quizzes from "./components/Quizzes";
import QuizDetails from "./components/QuizDetails";

const App = () => (
  // <Redirect to="/not-found" />

  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventsWrapper />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quizzes"
        element={
          <ProtectedRoute>
            <Quizzes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quizzes/:id"
        element={
          <ProtectedRoute>
            <QuizDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route path="/jobs/:id" element={<JobItemDetailsWrapper />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
