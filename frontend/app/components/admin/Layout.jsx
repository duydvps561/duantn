import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        <Header />
        <main style={mainStyle}>
          {children}
        </main>
      </div>
    </div>
  );
};

const layoutStyle = {
  display: 'flex',
};

const mainContentStyle = {
  marginLeft: '200px', // Adjust this to match the width of Sidebar
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white'
};

const mainStyle = {
  flex: '1',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  marginLeft: '2rem',
};

export default Layout;
