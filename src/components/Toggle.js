// Toggle.js
import { useContext } from 'react';
import ModeContext from '../context/mode-context';
import Button from './Button';

function Toggle() {

    const modeCtx = useContext(ModeContext)
//   const [isDark, setIsDark] = useState(false);

//   const handlerToggleLight = () => {
//     setIsDark((isDark) => !isDark);
//     console.log('isDark:', isDark);
//   }
  /*
    ES6 ternary operators are used to conditional assign
    buttonLabel according to the value of isDark.  
  */
  const buttonLabel = modeCtx.isDark ? '🌛' : '🌞';
  return (
  <span>
    Toggle Mode<Button label={buttonLabel} onClick={modeCtx.handlerToggle} />
  </span>
  )
}

export default Toggle;