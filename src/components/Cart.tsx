import { useStore } from '@nanostores/solid'
import { createSignal } from 'solid-js'
import { cartItems } from '../stores/cart'
import classNames from 'classnames'

function Cart () {
    const items = useStore(cartItems)
    const [state, setState] = createSignal(true)
    setTimeout(() => setState(false), 100)
    return <button type="button" class={classNames({'opacity-0': state()}, "duration-300 transition-opacity bg-teal-600 text-white hover:bg-teal-500 rounded-md px-4")}>
        cart ({items().length})
    </button>
}

export default Cart