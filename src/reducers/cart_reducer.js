import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action ) => {
  if(action.type === ADD_TO_CART) {
    const {id, color, amount, product} = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)

    if(tempItem) {
      const newCart = state.cart.map((cartItem) => {
        if(cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if(newAmount > cartItem.max){
            newAmount = cartItem.max
          }
          return {...cartItem, amount: newAmount}
        } else {
          return cartItem
        }
      })
      return {...state, cart: newCart}
    } else {
      const newItem = {
        id: id+color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return {...state, cart: [...state.cart, newItem]}
    }
  }
  if(action.type === REMOVE_CART_ITEM){
    const temp = state.cart.filter((item) => item.id !== action.payload)
    return {...state, cart: temp}
  }
  if(action.type === CLEAR_CART) {
    return {...state, cart: []}
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id, value} = action.payload;
    const temp = state.cart.map((item) => {
      if(item.id === id) {
        if(value === "inc") {
          let newAmount = item.amount + 1
          if(newAmount > item.max){
          newAmount = item.max
          }
          return {...item, amount: newAmount}
        }
        if(value === "dec"){
          let newAmount = item.amount - 1
          if(newAmount < 1){
          newAmount = 1
          }
          return {...item, amount: newAmount}
        }
      } else {
        return item
      }
    })
    return {...state, cart: temp}
  }
  if(action.type === COUNT_CART_TOTALS){
    const {totalItems, totalAmount} = state.cart.reduce((total, cartItem)=>{
      const {amount, price} = cartItem
      total.totalItems += Math.ceil(amount)
      total.totalAmount += price * amount
      return total
    },{totalItems: 0, totalAmount:0}
  )
  const roundedTotalAmount = Math.ceil(totalAmount);
    return {...state, totalItems, totalAmount: roundedTotalAmount }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
