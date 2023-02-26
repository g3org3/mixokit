import { createSignal } from 'solid-js'
import confetti from 'canvas-confetti'
import CartList from './CartList'
import { clearCart } from '../stores/cart'

function Checkout() {
  const [state, setState] = createSignal(false)

  const onClick = () => {
    setState(true)
    clearCart()
    confetti()
    setTimeout(confetti, 300)
    setTimeout(confetti, 600)
  }

  return (
    <>
      {state() ? (
        <div class="border-l-8 p-4 border-green-400 gap-4 bg-green-50 px-2 flex flex-col font-light">
          <div class="text-5xl text-green-900 text-center">Gracias por su compra!</div>
          <div class="text-2xl text-center">
            Te enviaremos un visalink con la <br />
            confirmacion de tu pedido via whatsapp
          </div>
          <div class="flex self-center flex-col px-2 relative">
            <img class="h-10" src="https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png" />
            <div class="h-4 w-4 -right-2 top-0 animate-bounce rounded-full absolute bg-red-600"></div>
          </div>
        </div>
      ) : (
        <>
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/2 flex flex-col gap-2">
              <div class="text-3xl text-slate-600 font-light">Checkout</div>
              <input
                placeholder="Nombre"
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <input
                placeholder="Telefono"
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                onClick={onClick}
                class="p-2 px-10 text-teal-800 active:bg-teal-300 hover:bg-teal-200 rounded-md bg-teal-100 text-2xl"
              >
                Confirm Order
              </button>
            </div>
            <div class="md:w-1/2">
              <CartList />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Checkout