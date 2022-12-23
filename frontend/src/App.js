import React from 'react';
import { Container } from 'react-bootstrap';

// Components 
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome To Pro Shop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
