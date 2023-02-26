import { useStore } from '@nanostores/solid'
import { cartItems, clearCart } from '../stores/cart'
import products from '../products.json'
import { createSignal } from 'solid-js'
import classNames from 'classnames'

type TProducts = typeof products
type TProduct = TProducts[number]
const byCode = products.reduce<Record<string, TProduct>>((by, p) => ({ ...by, [p.code]: p }), {})

function Cart() {
  const items = useStore(cartItems)
  const [state, setState] = createSignal(true)

  return (
    <div class="relative flex flex-row-reverse">
      <button
        type="button"
        onClick={() => setState((s) => !s)}
        class="duration-300 relative flex-shrink-0 bg-teal-600 text-white hover:bg-teal-500 rounded-md px-8"
      >
        cart
        {items().length > 0 ? (
          <div class="absolute z-10 -top-2 px-2 rounded-full -right-2 bg-white text-teal-700 font-bold shadow">
            {items().length}
          </div>
        ) : null}
      </button>
      <div class="">
        <div
          style={{ width: '400px' }}
          class={classNames(
            { hidden: state() },
            'absolute right-0 z-10 flex flex-col mt-11 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabindex="-1"
        >
          <div class="flex flex-col max-h-96 overflow-y-auto">
            {items()
              .reverse()
              .map((i) => (
                <a
                  href={'/product/' + i}
                  class="flex flex-col px-1"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  <div class="flex hover:bg-slate-100 border-b border-slate-100 items-center gap-2 p-2 text-sm text-gray-700">
                    <img class="h-20" src={byCode[i].imageUrl} />
                    <div>{byCode[i].title}</div>
                  </div>
                </a>
              ))}
          </div>
          <div class="text-center flex pt-1 px-1">
            <button
              onClick={() => clearCart().then(() => setState(true))}
              class="hover:bg-slate-100 p-2 w-1/2 rounded-b text-slate-500"
            >
              clear
            </button>
            <a
              href="/checkout"
              class="w-1/2 p-2 rounded-b hover:bg-teal-600 hover:text-white text-teal-600 border-l border-slate-100 font-bold"
            >
              <button class="">checkout</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
