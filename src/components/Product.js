import { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './Product.module.css'
import Card from './Card';
import ViewList from './ViewList';
import Toggle from './Toggle';
import Button from './Button';

import ProductContext from '../context/ProductContext';
import ModeContext from '../context/mode-context';

const blankForm = {
  index: 0,
  name: '',
  quantity: 0,
  price: 0,
  discount: 0
}

function Product() {
  const ctx = useContext(ProductContext);
  //so we can use the isDark state here
  const modeCtx = useContext(ModeContext);

  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);

  //form state to store data loaded
  const [form, setForm] = useState(blankForm);

  const [isEditing, setIsEditing] = useState(false);

  const handlerEditForm = (id) => {
    const foundIndex = list.findIndex((item) => item.id === id);

      // save the data of that element into our form state
    setForm({
      index: foundIndex,
      name: list[foundIndex].name,
      quantity: list[foundIndex].quantity,
      price: list[foundIndex].price,
      discount: list[foundIndex].discount
    })
    setIsEditing(true);
  }

  const handlerDeleteItem = (id) => {
    if (isEditing === true) return alert("Please click cancel to stop editing in order to delete this entry")
    const newList = list.filter((item) => item.id !==id);
    setList(newList);

    const foundIndex = list.findIndex((item) => item.id === id);

    const newSum = sumTotal - list[foundIndex].total;
    setSumTotal(newSum);
  }

  const handlerSubmitForm = (e) => {
    e.preventDefault();

    //not a react thing - standard JS/ HTML
    //submit a form - actually it tries call a server - page refresh

    // making a copy of the selected object
    const newItem = {...list[form.index]};
    console.log(newItem);

    newItem.name = form.name;
    newItem.quantity = form.quantity;
    newItem.price = form.price;
    newItem.discount = form.discount;
    newItem.total = (form.quantity * form.price * (100 - form.discount))/ 100;
    
    //copy current list and replace edited item
    const newList = [...list];
    // replace that element at that selected index from the new item
    newList[form.index] = newItem;
    setList(newList);
    const newSum = sumTotal - list[form.index].total + newItem.total;
    setSumTotal(newSum);
    setIsEditing(false);
  }
  
  const handlerAddProduct = () => {
    
    // Create new list item
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: ctx.count * ctx.price * (100-ctx.discount)/100,
   } 
   
   // Copy previous list and append new item to its end
   const newList = [...list, newItem];
  //  console.log('  newList:', newList);
   setList(newList);

   // Add the item total to the running listTotal
   const sum = sumTotal + newItem.total;
  //  console.log('  sumTotal:', sumTotal);
   setSumTotal(sum);
  }

  const handlerUpdateForm = (e) => {
    console.log(e.target.name, e.target.value);

    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    // if modeCtx.is Dark is true, apply styles.dark
    // <div className={styles.container}>
    <div className={`${styles.container} ${modeCtx.isDark && styles.dark}`}>
      <Toggle/>
      <Card
        handlerAddProduct={handlerAddProduct}
      />
      {/* note: edited to show the list only when there are items to practice '&&' */}
      {list.length > 0 && <ViewList 
        list={list} 
        sum={sumTotal} 
        handlerDeleteItem={handlerDeleteItem}
        handlerEditItem={handlerEditForm}/>}
      {isEditing && <form className={styles.form} onSubmit ={handlerSubmitForm}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Disc %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input value={form.name} type='text' name='name'
                onChange={handlerUpdateForm} />
            </td>
            <td>
              <input value={form.quantity} type='number' min={1} name='quantity'
                onChange={handlerUpdateForm} />
            </td>
            <td>
              <input value={form.price} type='number' min={0} step={0.01} name='price'
                onChange={handlerUpdateForm} />
            </td>
            <td>
              <input value={form.discount} type='number' min={0} name='discount'
                onChange={handlerUpdateForm} />
            </td>
          </tr>
        </tbody>
      </table>
      <input type = "Submit"/>
      <Button label ="Cancel" onClick={() => setIsEditing(false)}/>
    </form>}
    
    </div>
  );
}
export default Product;
