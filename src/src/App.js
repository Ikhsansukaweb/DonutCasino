import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Games from './pages/Games';
import Wallet from './pages/Wallet';
import Navbar from './components/Navbar';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (session === null) return <div>Loading...</div>;

  return (
    <Router>
      {session ? (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/games" />} />
            <Route path="/games" element={<Games session={session} />} />
            <Route path="/wallet" element={<Wallet session={session} />} />
            <Route path="*" element={<Navigate to="/games" />} />
          </Routes>
          <Navbar />
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
    }
