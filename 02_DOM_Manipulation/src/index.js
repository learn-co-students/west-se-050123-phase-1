//BookStore has been moved to data.js 
console.log(bookStore);

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//* Create a function that uses a selector to get the header and add the bookStore name as its text content
// Renders Header

//* Create a function that grabs all the divs form the footer and add the book store name, address, hours and/or phone number
// Renders Footer

//* 1. use a forEach to iterate over BookStore inventory.
//  2. Pass the forEach an anonymous callback that takes the inventory data and creates an li, with an h3 tag, 2 p tags, and image tag.
// 3. Add the cardData content to the tags.
// 4. Append li to the DOM through the ul with the id of book-list



// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

// function renderBook(book) {
// should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript : A Modern Introduction to Programming</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  //   <button>Delete</button>
  // </li>

  //* Organize functions calls
