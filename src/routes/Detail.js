import { useEffect, useState } from 'react';
import '../App.css';
import { createRoutesFromElements, useNavigate, useParams } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import styled from 'styled-components';
import { addItem } from '../store.js';
import { useDispatch } from 'react-redux';

function Detail(props) {
  let {id} = useParams()
  let find = props.shoes.find(item => item.id === parseInt(id));
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let currentWatched = JSON.parse(localStorage.getItem('watched'));
  currentWatched.push(find.id);
  currentWatched = new Set(currentWatched);
  currentWatched = Array.from(currentWatched);
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(currentWatched));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 200);

    return() => {
      setFade('');
    }
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      setAlert(true);
      clearTimeout(timeOut);
    }
  }, []);

  return (
    <div className={`container start ${fade}`}>
      {
        alert === true ? <div className='alert alert-warning'>2초이내 구매시 할인</div> : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${find.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{find.title}</h4>
          <p>{find.content}</p>
          <p>{find.price}</p>
          <button className="btn btn-danger" onClick={() => {
            dispatch(addItem(find));
            navigate(`/cart`);
            }}>주문하기</button> 
        </div>
      </div>
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div> 
  )
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 200);

    return() => {
      setFade('');
    }
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div>
  )
}

export default Detail;