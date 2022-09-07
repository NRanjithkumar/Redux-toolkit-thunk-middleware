import Navbar from "./components/Navbar";
import CartContainers from "./components/CartContainers";
import {useDispatch,useSelector} from 'react-redux';
import {calculateTotals, getCartItems} from './features/cart/cartSlice';
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const {cartItems, isLoading}=useSelector((state)=>state.cart);
  //console.log(cartItems);
  const {isOpen}=useSelector((state)=>state.modal);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(calculateTotals());
  },[dispatch, cartItems]);

  useEffect(() => {
    dispatch(getCartItems('Ranjith'));
  },[]);

  if(isLoading)
  {
    return (<div className="loading">
      <h2>...Loading</h2>
    </div>);
  }

  return(
     <main>
      {isOpen && <Modal/>}
      
      <Navbar/>
      <CartContainers/>
     </main>
  );
}
export default App;
