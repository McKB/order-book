// take in incoming order and existing book

// take apart the incoming order, grab type, quantity, and price

// loop over existing book. 

// If empty, add order to book.
// if type matches all exisitng orders, add order to book.
// if type does not match all, check quantity & price of each where types are not equal (start at the 
//      beginning of the book).

// do the following for unmatched types:

// if both quantity and price match one exisitng order, remove that order from existing book and end the search.
// if quantity matches but price does not, check the rest, then add the order to book. (add extra credit here)
// if quantity does not match but price does, more testing is required:

// 1. if quantity in existing book is smaller, partially fulfill the incoming order, 
//      remove that order, keep looking through existing book for another matching price. 
//      If no more matching price, and add remainder of incoming to order book. 
//      If price matches another, run through the parent if-statement again. 
// 2. if quantity in existing book is larger, fulfill the incoming order and reduce
//      the existing order in the book

// if neither price nor quantity match, add the order to the book. (extra credit may apply here? (partial orders))
