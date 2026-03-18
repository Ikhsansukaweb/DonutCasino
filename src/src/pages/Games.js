import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const gamesList = [
  { id: 1, name: 'HILO', provider: 'BetDice', img: 'https://cdn-icons-png.flaticon.com/512/832/832632.png', isNew: true },
  { id: 2, name: 'CASE BATTLES', provider: 'GrowDice', img: 'https://cdn-icons-png.flaticon.com/512/3775/3775486.png' },
  { id: 3, name: 'CASES', provider: 'GrowDice', img: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
  { id: 4, name: 'REME', provider: 'GrowDice', img: 'https://cdn-icons-png.flaticon.com/512/1790/1790992.png' },
  { id: 5, name: 'WHEEL', provider: 'GrowDice', img: 'https://cdn-icons-png.flaticon.com/512/753/753345.png' },
  { id: 6, name: 'MINES', provider: 'GrowDice', img: 'https://cdn-icons-png.flaticon.com/512/1063/1063606.png' },
];

export default function Games({ session }) {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  // Fetch user donuts_balance info from DB
  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, donuts_balance')
        .eq('id', session.user.id)
        .single();

      if (!error && data) {
        setUser(data);
      } else {
        // If user data not exist, create user record
        const { error: insertError } = await supabase.from('users').insert([{ id: session.user.id, username: session.user.email, donuts_balance: 100 }]);
        if (!insertError) {
          setUser({ id: session.user.id, username: session.user.email, donuts_balance: 100 });
        }
      }
    }
    fetchUser();
  }, [session.user.id]);

  const filteredGames = gamesList.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#0b123d',
      color: 'white',
      minHeight: '100vh',
      paddingBottom: 70,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{
        padding:16,
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#121a4c'
      }}>
        <h2>BetDice Originals</h2>
        <div>
          Saldo: <b>{user?.donuts_balance ?? '-'}</b> 🍩{' '}
          <button 
            onClick={handleSignOut} 
            style={{backgroundColor:'transparent',border:'none',color:'white',cursor:'pointer',fontWeight:'bold',marginLeft:12}}
          >Logout</button>
        </div>
      </header>
      <main style={{padding: 16, flex: 1}}>
        <input
          placeholder="Cari Permainan..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 10, borderRadius: 8, border: 'none', width: '100%', marginBottom: 12, fontSize: 16
          }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 12
        }}>
          {filteredGames.map(game => (
            <div key={game.id} style={{
              backgroundColor: '#1b2465',
              borderRadius: 12,
              padding: 8,
              position: 'relative',
              cursor: 'pointer',
              textAlign: 'center'
            }}>
              {game.isNew && (
                <div style={{
                  position: 'absolute',
                  top: 6,
                  left: 6,
                  backgroundColor: '#247eff',
                  padding: '2px 6px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>New</div>
              )}
              <img src={game.img} alt={game.name} style={{width: '100%', height: 80, objectFit:'contain', borderRadius: 8, marginBottom: 8}}/>
              <div style={{fontWeight: 'bold', fontSize: 14}}>{game.name}</div>
              <div style={{fontSize: 12, color: '#9db5ff'}}>{game.provider}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
    }
