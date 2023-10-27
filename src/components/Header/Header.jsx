import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import styles from './Header.module.css';

const Navigation = () => {
  return (
    <header className={styles.header}>

      <Link to="/"><img className={styles.logo} src={logo} alt="logo" /></Link>

      <nav className={styles.navigation}>
        <Link to="/">Main</Link>

        <Link to="/game">Game</Link>
      </nav>
    </header>
  )
}

export default Navigation;
