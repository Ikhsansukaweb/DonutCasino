import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Wallet({ session }) {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      let { data, error } = await supabase
        .from('users')
        .select('donuts_balance')
        .eq('id', session.user.id)
        .single();

      if (error) {
        setUser({ donuts_balance: 0 });
      } else {
        setUser(data);
      }
    }
    fetchUser();
  }, [session.user.id]);

  const handleDeposit = async () => {
    const num = parseInt(amount);
    if (!num || num <= 0) {
      setMessage('Masukkan jumlah valid');
      return;
    }
    const newBalance = (user.donuts_balance || 0) + num;

    const { error } = await supabase
      .from('users')
      .update({ donuts_balance: newBalance })
      .eq('id', session.user.id);

    if (error) setMessage('Gagal deposit: ' + error.message);
    else {
      setUser({ donuts_balance: newBalance });
      setMessage(`Deposit berhasil (+${num} 🍩)`);
      setAmount('');
    }
  };

  const handleWithdraw = async () => {
    const num = parseInt(amount);
    if (!num || num <= 0) {
      setMessage('Masukkan jumlah valid');
      return;
    }
    if (num > (user.donuts_balance || 0)) {
      setMessage('Saldo tidak cukup');
      return;
    }
    const newBalance = (user.donuts_balance || 0) - num;

    const { error } = await supabase
      .from('users')
      .update({ donuts_balance: newBalance })
      .eq('id', session.user.id);

    if (error) setMessage('Gagal withdraw: ' + error.message);
    else {
      setUser({ donuts_balance: newBalance });
      setMessage(`Withdraw berhasil (-${num} 🍩)`);
      setAmount('');
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto',
      marginTop: 48,
      padding: 16,
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#0b123d',
      borderRadius: 12,
      minHeight: '60vh'
    }}>
      <h2>Dompet</h2>
      <p>Saldo DonutsMP Anda:</p>
      <h3>{user?.donuts_balance ?? 0} 🍩</h3>

      <input
        type="number"
        placeholder="Jumlah"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          fontSize: 16,
          borderRadius: 8,
          border: 'none',
          margin: '16px 0'
        }}
      />

      <button onClick={handleDeposit} style={btnStyle}>Deposit</button>
      <button onClick={handleWithdraw} style={{ ...btnStyle, marginTop: 8, backgroundColor: '#ff5555' }}>Withdraw</button>

      {message && <p style={{marginTop: 16}}>{message}</p>}
    </div>
  );
}

const btnStyle = {
  width: '100%',
  padding: 12,
  borderRadius: 8,
  border: 'none',
  backgroundColor: '#176fff',
  color: 'white',
  fontSize: 16,
  cursor: 'pointer',
};
