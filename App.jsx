import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Habits from './pages/Habits';
import Assignments from './pages/Assignments';
import LearningTracker from './pages/LearningTracker';
import Projects from './pages/Projects';
import MissionMode from './pages/MissionMode';
import AITutor from './pages/AITutor';
import CalendarView from './pages/CalendarView';
import ProgressAnalytics from './pages/ProgressAnalytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public authentication route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="goals" element={<Goals />} />
          <Route path="habits" element={<Habits />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="learning" element={<LearningTracker />} />
          <Route path="projects" element={<Projects />} />
          <Route path="missions" element={<MissionMode />} />
          <Route path="tutor" element={<AITutor />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="progress" element={<ProgressAnalytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
