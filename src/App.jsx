import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import {
  Practice,
  Resources,
  Profile
} from './pages/Placeholders';
import { Dashboard } from './pages/Dashboard';
import { Assessments } from './pages/Assessments';
import { TestChecklist, ShipReadiness, ProofPage } from './pages/DevTools';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/results" element={<Navigate to="/assessments" replace />} />
          <Route path="/history" element={<Navigate to="/assessments" replace />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prp/07-test" element={<TestChecklist />} />
          <Route path="/prp/08-ship" element={<ShipReadiness />} />
          <Route path="/prp/proof" element={<ProofPage />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
