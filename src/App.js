import Product from './components/Product'
import {ProductProvider} from './context/ProductContext';
import { ModeProvider } from './context/mode-context';
import './App.css';

function App() {
  return (
    <div className="App">
      <ModeProvider>
        <ProductProvider>
          <Product />
        </ProductProvider>
      </ModeProvider>
    </div>     
  );
}


export default App;
