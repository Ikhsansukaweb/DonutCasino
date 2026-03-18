import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { id: 1, label: 'Jelajah', icon: '🔍', to: '/games' },
    { id: 2, label: 'Beranda', icon: '🏠', to: '/games' },
    { id: 3, label: 'Dompet', icon: '👛', to: '/wallet' },
    { id: 4, label: 'Obrolan', icon: '💬', to: '/chat' }, // Placeholder, can be extended
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#121a4c',
      paddingTop: 8,
      paddingBottom: 12,
      borderTop: '1px solid #253095',
      zIndex: 100,
    }}>
      {navItems.map(item => (
        <NavLink key={item.id} to={item.to} style={({ isActive }) => ({
          color: isActive ? '#176fff' : '#6c75be',
          fontWeight: isActive ? 'bold' : 'normal',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: 12,
          textDecoration: 'none'
        })}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
