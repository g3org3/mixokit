import { useStore } from '@nanostores/solid'
import { cartItems, clearCart } from '../stores/cart'
import allproducts from '../all_products.json'
import { createSignal } from 'solid-js'
import classNames from 'classnames'
import { getCode } from '../utils'

const _products = allproducts.map((x) => {
  return {
    code: getCode(x.Name),
    title: x.Name,
    imageUrl: x.Images.split(',')[0].trim(),
    price: Number(x['Regular price']) || 0,
    tag: x.Tags.split(',')[0].trim(),
    desc: x['Short description'],
  }
})

interface TProduct {
  title: string
  price: number
  imageUrl: string
  desc: string
  code: string
  tag: string
}

const byCode = _products.reduce<Record<string, TProduct>>((by, product) => {
  by[product.code] = product

  return by
}, {})

function Icon() {
  return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
}


function Cart() {
  const items = useStore(cartItems)
  const [state, setState] = createSignal(true)

  return (
    <div class="relative flex flex-row-reverse">
      <button
        type="button"
        onClick={() => setState((s) => !s)}
        class={classNames(
          { 'ja-event-name=Click+OpenCart': true, 'bg-teal-500': !state() },
          'duration-300 relative flex items-center gap-1 flex-shrink-0 shadow-md bg-teal-600 focus:ring-1 focus:ring-teal-500 focus:ring-offset-2 text-white hover:bg-teal-500 rounded-md px-6'
        )}
      >
        <span><Icon /></span>
        <span>carrito</span>
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
            'absolute right-0 z-10 flex flex-col mt-11 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none ring-1 ring-offset-2 ring-teal-500'
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabindex="-1"
        >
          <div class="flex flex-col max-h-96 overflow-y-auto">
            {items().map((i) => (
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
              <button class="ja-event-name=Click+Checkout">checkout</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
