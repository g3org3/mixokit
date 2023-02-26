import { useStore } from '@nanostores/solid'
import { cartItems } from '../stores/cart'
import products from '../products.json'
import { createSignal } from 'solid-js'
import classNames from 'classnames'

const byCode = products.reduce((by, p) => ({...by, [p.code]: p }), {})

function Cart () {
    const items = useStore(cartItems)
    const [state, setState] = createSignal(true)
    
    return <div>
        <button type="button" onClick={() => setState(s => !s)} class="duration-300 flex-shrink-0 bg-teal-600 text-white hover:bg-teal-500 rounded-md px-4">
            cart ({items().length})
        </button>
        <div class={classNames({ "hidden": state() }, "relative ml-3" )}>
            <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                {items().map(i =>
                    <a href="#" class="flex border-b border-slate-100 items-center gap-2 p-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                        <img class="h-10" src={byCode[i].imageUrl} />
                        <div>{byCode[i].title}</div>
                    </a>
                )}
          </div>
        </div>
    </div>
}

export default Cart
