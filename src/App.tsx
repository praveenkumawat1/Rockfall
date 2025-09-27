import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AlertsPage from './components/AlertsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;