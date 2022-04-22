// reconcileOrder // 
const reconcileOrder = (book, newOrder) => {
  let updatedBook = []

  // Empty Book? //
  if (!book.length) {
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
  let updatedOrderArray = [newOrder] // if no changes are made, this is the only update

  for (let existingOrder of book) {
    if (!equalType(existingOrder, newOrder)) {
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

  if (noDeal(existingOrder, newOrder)) {
    updatesArray.push(existingOrder, newOrder)
  }
  else if (partialDeal(existingOrder, newOrder)) {
    updatesArray = partialBuy(existingOrder, newOrder)
  }
  else if (bargainDeal(existingOrder, newOrder)) {
    let noDealFlag = greatDeal(existingOrder, newOrder)

    if (noDealFlag) {
      updatesArray.push(noDealFlag)
    }
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

const equalType = (existingOrder, newOrder) => existingOrder.type === newOrder.type

// eslint-disable-next-line max-len
const greatDeal = (existingOrder, newOrder) => (existingOrder.type === 'buy' && existingOrder.price < newOrder.price) || (existingOrder.type === 'sell' && existingOrder.price > newOrder.price)

// eslint-disable-next-line max-len
const partialDeal = (existingOrder, newOrder) => existingOrder.quantity !== newOrder.quantity && existingOrder.price === newOrder.price

// eslint-disable-next-line max-len
const bargainDeal = (existingOrder, newOrder) => existingOrder.quantity === newOrder.quantity && existingOrder.price !== newOrder.price

// eslint-disable-next-line max-len
const noDeal = (existingOrder, newOrder) => existingOrder.quantity !== newOrder.quantity && existingOrder.price !== newOrder.price



module.exports = reconcileOrder
