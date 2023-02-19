import { useStore } from '@nanostores/solid'
import classNames from 'classnames'
import { createSignal } from 'solid-js'
import { addToCart, cartItems } from '../stores/cart'

function AddToCart (props: { id: string}) {
    const items = useStore(cartItems)
    const [state, setState] = createSignal(true)
    setTimeout(() => setState(false), 100)

    return <button disabled={items().includes(props.id)} onClick={() => {
        addToCart(props.id)
    }} class={classNames({'opacity-0': state()},"duration-700 transition-all rounded-md disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-teal-700 bg-teal-700 hover:bg-teal-600 active:bg-teal-800 text-white p-2 px-4")}>
        {items().includes(props.id) ? '✅ Added' : 'Add to cart'}
    </button>
}

export default AddToCart