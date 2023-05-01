import { useStore } from '@nanostores/solid'
import { addToCart, cartItems } from '../stores/cart'

interface Props {
  id: string
}

function AddToCart(props: Props) {
  const items = useStore(cartItems)
  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    addToCart(props.id)
  }
  const isAlreadyAdded = () => items().includes(props.id)

  return (
    <button
      disabled={isAlreadyAdded()}
      onClick={onClick}
      class="ja-event-name=Click+AddToCart duration-700 transition-all rounded-md disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-teal-700 bg-teal-700 hover:bg-teal-600 active:bg-teal-800 text-white p-2 px-4"
    >
      {isAlreadyAdded() ? '✅ Added' : 'Add to cart'}
    </button>
  )
}

export default AddToCart
