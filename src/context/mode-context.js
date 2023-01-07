//can use capitalised js is for modules
import { createContext, useState } from "react";

const ModeContext = createContext({
    //can let the editor do autocomplete
    isDark: false,
    handlerToggle: () => {},
});

export function ModeProvider({children}) {

    const [isDark, setIsDark] = useState(false);

    const handlerToggle = () => {
        setIsDark((isDark) => !isDark);
    };

    const context = {
        isDark: isDark,
        handlerToggle: handlerToggle
    };

    return (
        <ModeContext.Provider value = {context}>
            {children}
        </ModeContext.Provider>
    );
}

export default ModeContext