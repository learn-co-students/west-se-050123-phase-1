//////////////////////////////////////
// Select elements (that will be referenced frequently)
//////////////////////////////////////
const bookForm = document.querySelector('#book-form');
const toggleBookFormButton = document.querySelector('#toggleForm')


//////////////////////////////////////
// Helper functions
//////////////////////////////////////

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

function fillIn(form, data){
  form.title.value = data.title;
  form.author.value = data.author;
  form.price.value = data.price;
  form.imageUrl.value = data.imageUrl;
  form.inventory.value = data.inventory
}

fillIn(bookForm, {
  title: 'Designing Data-Intensive Applications',
  author: "Martin Kleppmann",
  price: 22,
  inventory: 1,
  imageUrl: 'https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX379_BO1,204,203,200_.jpg'
})

//////////////////////////////////////
// render functions  (Data => Display)
//////////////////////////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('#store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#store').textContent = bookStore.location;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#address').textContent = bookStore.address;
}

// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const pAuthor = document.createElement('p');
  const pPrice = document.createElement('p');
  const pStock = document.createElement('p');
  const img = document.createElement('img');
  const btn = document.createElement('button');
  
  li.className = 'list-li';
  h3.textContent = book.title;
  pAuthor.textContent = book.author;
  pPrice.textContent = formatPrice(book.price);
  pStock.className = 'grey'
  if (book.inventory === 0) {
    pStock.textContent = "Out of Stock"
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!"
  } else {
    pStock.textContent = "In stock"
  }
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  img.title = `${book.title} cover`;
  
  btn.textContent = 'Delete';
  
  btn.addEventListener('click', () => li.remove())
  
  li.append(h3, pAuthor, pPrice, pStock, img, btn);
  
  document.querySelector('#book-list').append(li);
}

function renderError(error) {
  console.log("🚀 ~ file: index.js:85 ~ renderError ~ error:", error.message)
  const errDiv = document.createElement('div');
  errDiv.classList.add('error')
  errDiv.textContent = error.message
  document.querySelector('main').prepend(errDiv)
}

//////////////////////////////////////
// Event listeners & handlers  (Behavior => (Data) => Display)
//////////////////////////////////////

// hide and show the book form upon clicking the toggleBookFormButton
toggleBookFormButton.addEventListener('click', toggleBookForm)

function toggleBookForm() {
  const isHidden = bookForm.classList.toggle('collapsed')
  if (isHidden) {
    toggleBookFormButton.textContent = "NewBook"
  } else {
    toggleBookFormButton.textContent = "Hide Book Form"
  }
}

// If we want to be able to hide the form on typing escape
window.addEventListener('keydown', (e) => {
  // console.log(e.code)
  const isVisible = !bookForm.classList.contains('collapsed')
  if (isVisible && e.code === "Escape") {
    toggleBookForm()
  }
})

// listen for form submission and handle submit by adding new book to page
bookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.dir(e.target)
  // renderBook expects and argument with the following shape:
  // {
    //   id:1,
    //   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    //   author: 'Marjin Haverbeke',
    //   price: 10.00,
    //   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
    //   inventory: 10,
    //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    // }
    const newBook = {
      title: e.target.title.value,
      author: e.target.author.value,
      price: parseFloat(e.target.price.value),
      inventory: parseInt(e.target.inventory.value),
      imageUrl: e.target.imageUrl.value,
      reviews: []
    }
    e.target.reset()
    toggleBookForm()
    renderBook(newBook)
  })
  
  ////////////////////////////////////////////
  // call render functions to populate the DOM
  ////////////////////////////////////////////
  
// renderHeader(bookStore);
// renderFooter(bookStore);
// bookStore.inventory.forEach(renderBook);


/////////////////////////////////////////////////////////////////////
// Communicating with the Server (via .fetch) => Then update the DOM
////////////////////////////////////////////////////////////////////


// const request = fetch('http://localhost:3000/books')
// console.log("🚀 ~ file: index.js:151 ~ request:", request)
// request
//   .then(response => {
//     console.log(response)
//     return response.json()
//   })
//   .then(data => console.log(data))

fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(booksArr => {
    console.log(booksArr)
    booksArr.forEach(book => renderBook(book))
    // booksArr.forEach(renderBook) // shorthand for the line above
  })
  .catch(error => { // .catch only rescuses from a request that gets no response
    console.error(error) // if there's a response, even with status in 400-500s
    renderError(error) // it won't be handled here
  })

fetch("http://localhost:3000/stores/3")
  .then(res => {
    if (res.ok) { // any status code outside of 200-300s will make .ok falsy
      return res.json()
    } else {
      throw new Error(res.statusText) // raise a custom error to trigger .catch
    }
  })
  .then((bookStore) => {
    renderHeader(bookStore);
    renderFooter(bookStore);
  })
  .catch(renderError)
