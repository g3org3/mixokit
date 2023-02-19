import { persistentAtom } from '@nanostores/persistent'

export const cartItems = persistentAtom<Array<string>>('cartItems', [], { encode: JSON.stringify, decode: JSON.parse })

export const addToCart  = (id: string) => {
    cartItems.set(cartItems.get().concat(id))
}