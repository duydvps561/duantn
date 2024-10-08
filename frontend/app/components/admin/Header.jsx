import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={titleContainerStyle}>
        <h4 style={leftTitleStyle}>ACE ADMIM</h4>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#ffffff',
  color: 'black',
  padding: '10px',
  textAlign: 'center',

};

const titleContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px', // Add some horizontal padding
};

const leftTitleStyle = {
  margin: 0, // Remove default margin
  color: '#4d6950',
  
};

const rightTitleStyle = {
  margin: 0, // Remove default margin
};

export default Header;
