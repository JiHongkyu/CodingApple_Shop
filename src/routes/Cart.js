import React from 'react';
import { Table } from 'react-bootstrap';
import { addCount } from '../store.js';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {
          state.cart.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].title}</td>
                <td>{state.cart[i].count}</td>
                <td><button onClick={() => { dispatch(addCount(item.id)) }}>+</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table> 
  )
}

export default Cart;