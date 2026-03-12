import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {

  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(true);
  const [showPlants, setShowPlants] = useState(false);



  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => { 
    return cart.reduce((total, item) => { 
        const price = parseFloat(item.cost.substring(1));
        return total + price * item.quantity; 
    }, 0); 
  };

  const handleContinueShopping = (e) => {
    e.preventDefault(); 
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity + 1 
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) { 
        dispatch(updateQuantity({ 
            name: item.name, 
            quantity: item.quantity - 1 
        })); 
    } 
    else { 
        dispatch(removeItem(item.name)); 
    }
  };

  const handleRemove = (item) => {
    const exists = cart.find(cartItem => cartItem.name === item.name);
    if (exists) {
      dispatch(removeItem(item.name));
    } else {
      alert("Item not found in cart.");
    }
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  };

  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const calculateTotalQuantity = () => { 
    return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0; 
  };
  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
}
const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
}
const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
}


  return (
    <>
    <div>
    <div className="navbar" style={styleObj}>
        <div className="tag">
            <div className="luxury">
                <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                <a href="/" onClick={(e) => handleHomeClick(e)}>
                    <div>
                        <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                        <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                    </div>
                </a>
            </div>

        </div>
        <div style={styleObjUl}>

  <div>
    <a href="#" onClick={(e) => handleHomeClick(e)} style={styleA}>
      Home
    </a>
  </div>

  <div>
    <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
      Plants
    </a>
  </div>

  <div>
    <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
      <h1 className="cart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
          <rect width="156" height="156" fill="none"></rect>
          <circle cx="80" cy="216" r="12"></circle>
          <circle cx="184" cy="216" r="12"></circle>
          <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
            fill="none"
            stroke="#faf9f9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>

        <span style={{ marginLeft: "10px" }}>
          {calculateTotalQuantity()}
        </span>
      </h1>
    </a>
  </div>

</div>
    </div>
</div>

    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>

  </>
  );
};

export default CartItem;
