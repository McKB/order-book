// reconcileOrder // 
const reconcileOrder = (book, newOrder) => {
  let updatedBook = []

  // Empty Book? //
  if (book.length === 0) {
    updatedBook.push(newOrder)
  }
  else {
    updatedBook = readBook(book, newOrder)
  }

  return updatedBook
}

// readBook //
const readBook = (book, newOrder) => {
  let updatedBook = []
  let updatedOrderArray = [newOrder]

  for (let i = 0; i < book.length; i++) {
    let existingOrder = book[i]

    if (newOrder.type !== existingOrder.type) {
      updatedOrderArray = buyOrSell(existingOrder, newOrder)
      // if noDealFlag is set to true, add existing order to book & reset updatedOrderArray
      if (updatedOrderArray[0] === true) {
        updatedBook.push(existingOrder)
        updatedOrderArray = [newOrder]
      }
    }

    else {
      updatedBook.push(existingOrder)
    }
  }

  updatedBook.push(...updatedOrderArray)

  return updatedBook
}

// do the following for unmatched types:
// if both quantity and price match one exisitng order, remove that order from existing book and end the search.
// if quantity matches but price does not, check the rest, then add the order to book. (add extra credit here)
// if quantity does not match but price does, more testing is required.
// if neither price nor quantity match, add the order to the book. (extra credit may apply here? (partial orders))

// buyOrSell //
const buyOrSell = (existingOrder, newOrder) => {
  let updatesArray = []

  if (existingOrder.price !== newOrder.price && existingOrder.quantity !== newOrder.quantity) {
    updatesArray.push(existingOrder, newOrder)
  }
  else if (existingOrder.price === newOrder.price && existingOrder.quantity !== newOrder.quantity) {
    updatesArray = partialBuy(existingOrder, newOrder)
  }
  else if (existingOrder.price !== newOrder.price && existingOrder.quantity === newOrder.quantity) {
    updatesArray = getDeal(existingOrder, newOrder)
  }

  return updatesArray
}

// 1. if quantity in existing book is smaller, partially fulfill the incoming order, 
//      remove the existing order, keep looking through existing book for another matching price. 
//      If no more matching price, and add remainder of incoming to order book. 
//      If price matches another, run through the parent if-statement again. 
// 2. if quantity in existing book is larger, fulfill the incoming order and reduce
//      the existing order in the book

// partialBuy // 
const partialBuy = (existingOrder, newOrder) => {
  let orderArray = []
  let updatedNewOrder = newOrder
  let updatedExistingOrder = existingOrder

  if (existingOrder.quantity < newOrder.quantity) {
    updatedNewOrder.quantity -= existingOrder.quantity
    orderArray.push(updatedNewOrder)
  }
  else {
    updatedExistingOrder.quantity -= newOrder.quantity
    orderArray.push(updatedExistingOrder)
  }

  return orderArray
}

// getDeal (extra credit) // 
const getDeal = (existingOrder, newOrder) => {
  let orderArray = []
  let noDealFlag = true

  if (existingOrder.type === 'buy' && existingOrder.price < newOrder.price) {
    orderArray.push(noDealFlag, existingOrder, newOrder)
  }
  else if (existingOrder.type === 'sell' && existingOrder.price > newOrder.price) {
    orderArray.push(noDealFlag, existingOrder, newOrder)
  }

  return orderArray
}

module.exports = reconcileOrder
