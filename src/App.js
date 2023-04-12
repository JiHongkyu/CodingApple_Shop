import React, { useEffect, useState } from 'react';
import data from './component/data.js';
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
import Carousel from './component/Carousel.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let [cnt, setCnt] = useState(2);
  let navigate = useNavigate();
  
  let currentWatched = localStorage.getItem('watched');
  useEffect(() => {
    if(!currentWatched) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  return (
    <div className='App'>
      <Navbar bg="white" variant="white">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <>
            <Carousel />
            <div className="container">
              <div className="row">
                {
                  shoes.map((_, i) => {
                    return (
                      <Card shoes={shoes[i]} i={i} key={shoes[i].id}></Card>
                    )
                  })
                }
              </div>
              {
                cnt <= 2 ? 
                <button className='more-btn' onClick={() => {
                  axios(`https://codingapple1.github.io/shop/data${cnt}.json`)
                  .then((getData) => {
                    setShoes(shoes.concat(getData.data));
                  })
                  .catch(() => {
                    alert('상품을 가져올 수 없습니다.');
                  });
                  setCnt(cnt+1);   
                }}>More</button>
                : null
              }
            </div>
          </>
        }></Route>
        <Route path='/detail/:id' element={ <Detail shoes={shoes} /> }></Route>
        <Route path='/cart' element={ <Cart /> }></Route>
        <Route path='*' element={ <div>404Page</div> }></Route>
      </Routes>
    </div>
  )
}

function Card({shoes, i}) {
  let navigate = useNavigate();

  return (
    <div className="col-md-4 col" onClick={() => { navigate(`/detail/${i}`) }} >
      <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg` }width="80%" onClick={() => { navigate(`/detail/${i}`) }} style={{ cursor: 'pointer' }} />
      <h4>{shoes.title}</h4>
      <p>{shoes.content} & {shoes.price.toLocaleString()}</p>
    </div>
  )
}

export default App;