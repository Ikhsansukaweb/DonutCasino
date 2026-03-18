import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setErrorMsg(error.message);
    else alert('Cek email untuk verifikasi.');
  };

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setErrorMsg(error.message);
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto',
      marginTop: 100,
      backgroundColor: '#0b123d',
      padding: 20,
      borderRadius: 12,
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Masuk / Daftar</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={inputStyle}
      />

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <button onClick={handleSignIn} disabled={loading} style={buttonStyle}>
        {loading ? 'Loading...' : 'Masuk'}
      </button>
      <button onClick={handleSignUp} disabled={loading} style={{ ...buttonStyle, backgroundColor: '#176fff', marginTop: 8 }}>
        {loading ? 'Loading...' : 'Daftar'}
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 6,
  border: 'none',
  fontSize: 16,
};

const buttonStyle = {
  width: '100%',
  padding: 12,
  marginTop: 20,
  borderRadius: 6,
  border: 'none',
  backgroundColor: '#121a4c',
  color: 'white',
  fontSize: 16,
  cursor: 'pointer',
};
