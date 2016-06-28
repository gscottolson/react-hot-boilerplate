import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    minHeight: '100vh',
    width: '80%',
  },
})

export default function Layout({ children }) {
  return (
    <div className={css(styles.component)}>
      {children}
    </div>
  )
}
