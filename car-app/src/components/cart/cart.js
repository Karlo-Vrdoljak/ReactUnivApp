import React from 'react';
import './cart.scss'
import config from '../../config';
import { navigate } from '@reach/router';
import { Item } from '../part/part';

function Cart(props) {
  if (config.globalState.getGlobalState('model')) {
    navigate('/');
    return <></>;
  }
  const [cart, setCart] = config.globalState.useGlobalState('cart');
  const itemsList = cart.items.map(c => <div className="cart-item"><Item from={'cart'} key={c.pkPart} part={c} /></div>)
  return (
    <div className="component-cart">
      <div className="cart-list">
        {itemsList}
      </div>
    </div>
  );
}

export default Cart