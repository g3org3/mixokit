import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

export type TCartCxtState = Array<string>

export type TCartCtx = [
    state: TCartCxtState,
    actions: {
        addToCart: () => void;
    }
]

const defaultState: TCartCxtState = []

const CartContext = createContext<TCartCtx>([
    defaultState, 
    {
        addToCart: () => {
            console.log('default')
        }
    }
])

export const CartProvider: ParentComponent<{}> = (props) => {
    const [state, setState] = createStore<Array<string>>([])

    const addToCart = () => {
        console.log('ADDED')
        setState(s => s.concat("1"))
    }

    console.log('provider render')

    return <CartContext.Provider value={[state, { addToCart }]}>
        {props.children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext)