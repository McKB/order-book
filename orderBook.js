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
  let newBook = []
  let updates = [newOrder]

  for (let existingOrder of book) {
    if (equalType(existingOrder, newOrder)) {
      newBook.push(existingOrder)
    }
    else {
      updates = buyOrSell(existingOrder, newOrder)
      if (noChanges(updates)) {
        newBook.push(existingOrder)
        updates = [newOrder]
      }
    }
  }
  newBook.push(...updates)

  return newBook
}

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
      updatesArray.push(existingOrder, newOrder)
    }
  }

  return updatesArray
}

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

const noChanges = (array) => array.length === 2

// eslint-disable-next-line max-len
const greatDeal = (existingOrder, newOrder) => (existingOrder.type === 'buy' && existingOrder.price < newOrder.price) || (existingOrder.type === 'sell' && existingOrder.price > newOrder.price)

// eslint-disable-next-line max-len
const partialDeal = (existingOrder, newOrder) => existingOrder.quantity !== newOrder.quantity && existingOrder.price === newOrder.price

// eslint-disable-next-line max-len
const bargainDeal = (existingOrder, newOrder) => existingOrder.quantity === newOrder.quantity && existingOrder.price !== newOrder.price

// eslint-disable-next-line max-len
const noDeal = (existingOrder, newOrder) => existingOrder.quantity !== newOrder.quantity && existingOrder.price !== newOrder.price



module.exports = reconcileOrder
