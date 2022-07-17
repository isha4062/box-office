import { useReducer , useEffect , useState } from 'react';

function showReducer(prevState , action){
    switch (action.type) {
        case 'ADD': {
            return [...prevState , action.showId];
        }
        case 'REMOVE': {
            return prevState.filter(showId => showId !== action.showId);
        }
    
        default: return prevState;
    }
}

function PersistedHook(reducer , initialState , key){
    const [state , dispatch] = useReducer(reducer , initialState , (initial) => {
        const persisted = localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        localStorage.setItem(key , JSON.stringify(state));
    } , [key , state]);

    return [state , dispatch];
}

export const usePersistedHook = (key = 'shows') => {
    return PersistedHook(showReducer , [] , key);
}

export const LastQuery = (key = 'lastQuery') => {
    const [input, setInput] = useState(() => {
            const persisted = sessionStorage.getItem(key);
            return persisted ? JSON.parse(persisted) : '';
    });
    const setPersistedInput = (newState) => {
        setInput(newState);
        sessionStorage.setItem(key , JSON.stringify(newState));
    }
    return [input , setPersistedInput];
}
