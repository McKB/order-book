// take in incoming order and existing book
const reconcileOrder = (book, newOrder) => {
  // set up book to return 
  const updatedBook = []

  // If empty, add order to book.
  if (book.length === 0) {
    updatedBook.push(newOrder)

    return updatedBook
  }
  else {
    return readBook(book, newOrder)
  }
}

// otherwise, loop over existing book.
const readBook = (book, newOrder) => {
  let updatedBook = []
  let updatedOrderArray = [newOrder]

  for (let i = 0; i < book.length; i++) {
    // if type does not match all, check quantity & price of each where types are not equal (start at the
    //      beginning of the book).
    if (newOrder.type !== book[i].type) {
      // more testing
      // from whatever function, return the updatedOrder to add to the order book, and the updated book.
      updatedOrderArray = buyOrSell(book[i], newOrder)
    }
    // IF types are EQUAL, run through loop again, but add the current order being tested to updated book.
    else {
      updatedBook.push(book[i])
    }
  }
  // push the updated order to the updatedBook. if types are equal, updatedOrder did not change. 
  //    if types were unequal, updated order will have changed and existing orders will have changed.
  for (let i = 0; i < updatedOrderArray.length; i++) {
    let updatedOrder = updatedOrderArray[i]

    updatedBook.push(updatedOrder)
  }

  return updatedBook
}

// do the following for unmatched types:

// if both quantity and price match one exisitng order, remove that order from existing book and end the search.
// if quantity matches but price does not, check the rest, then add the order to book. (add extra credit here)
// if quantity does not match but price does, more testing is required.
// if neither price nor quantity match, add the order to the book. (extra credit may apply here? (partial orders))
const buyOrSell = (existingOrder, newOrder) => {
  let updatesArray = []

  if (existingOrder.price === newOrder.price && existingOrder.quantity === newOrder.quantity) {
    return updatesArray
  }
  else if (existingOrder.price === newOrder.price) {
    updatesArray = partialBuy(existingOrder, newOrder)

    return updatesArray
  }
  else {
    updatesArray.push(existingOrder)
    updatesArray.push(newOrder)

    return updatesArray
  }
}

// 1. if quantity in existing book is smaller, partially fulfill the incoming order, 
//      remove the existing order, keep looking through existing book for another matching price. 
//      If no more matching price, and add remainder of incoming to order book. 
//      If price matches another, run through the parent if-statement again. 
// 2. if quantity in existing book is larger, fulfill the incoming order and reduce
//      the existing order in the book
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


module.exports = reconcileOrder
