import { useStore } from '@nanostores/solid'
import { cartItems, removeFromCart } from '../stores/cart'
import allproducts from '../all_products.json'
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

function CartList() {
  const $cartItems = useStore(cartItems)

  return (
    <div class="flex gap-2 flex-col">
      <div class="text-3xl font-light text-slate-600">
        Detalle de la orden -{' '}
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
            Eliminar
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartList
