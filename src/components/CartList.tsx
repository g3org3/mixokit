import { useStore } from '@nanostores/solid'
import { cartItems, removeFromCart } from '../stores/cart'
import products from '../products.json'

type TProducts = typeof products
type TProduct = TProducts[number]
const byCode = products.reduce<Record<string, TProduct>>((by, p) => ({ ...by, [p.code]: p }), {})

function CartList() {
  const $cartItems = useStore(cartItems)

  return (
    <div class="flex gap-2 flex-col">
      <div class="text-3xl font-light text-slate-600">
        Order Details -{' '}
        <span class="font-mono text-teal-700">
          Q{' '}
          {$cartItems()
            .map((id) => byCode[id])
            .reduce((sum, p) => sum + p.price, 0)
            .toFixed(2)}
        </span>
      </div>
      {$cartItems().map((id) => (
        <div class="p-2 flex border-b last:border-0 border-slate-100 items-center gap-2">
          <img class="h-20 rounded-xl" src={byCode[id].imageUrl} />
          <div class="flex-1">{byCode[id].title}</div>
          <div class="flex-shrink-0">Q {byCode[id].price.toFixed(2)}</div>
          <button
            class="hover:text-red-700 text-slate-400 transition-colors"
            onClick={() => removeFromCart(id)}
          >
            remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartList
