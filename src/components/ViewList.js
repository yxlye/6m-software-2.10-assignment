import { useContext } from 'react';
import styles from "./ViewList.module.css";
import ModeContext from '../context/mode-context';

function ViewList({ list, sum, handlerDeleteItem, handlerEditItem}) {
  
  const modeCtx = useContext(ModeContext);
  console.log(modeCtx.isDark)

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Disc %</th>
            <th>Total $</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id} isdark = {modeCtx.isDark.toString()}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{item.total.toFixed(2)}</td>
              <td onClick={() => handlerEditItem(item.id)}>📝</td>
              <td onClick={() => handlerDeleteItem(item.id)}>❌</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.containerSum}>
        Total sum: <span className={styles.sum}>{sum.toFixed(2)}</span>
      </div>
    </div>
  );
}
export default ViewList;
