// document.addEventListener('DOMContentLoaded', () => {
// Fetch requests
// Function for making a GET request
function fetchResource(url) {
	return fetch(url).then((res) => res.json())
}

function createResources(url, body) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	}).then((res) => res.json())
}

// ! PATCH Request
function updateResource(url, body) {
	// for a PATCH Req, we need to send the ID for the book (resource) that we are going to UPDATE with the Body
	const patchReqObj = {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(body),
	}
	return fetch(url, patchReqObj).then((res) => res.json())
}

// ! DELETE Request
function deleteResource(url) {
	return fetch(url, {
		method: "DELETE",
	}).then((res) => res.json())
}

// Rendering functions
// Renders Header
function renderHeader(store) {
	document.querySelector("h1").textContent = store.name
}
// Renders Footer
function renderFooter(store) {
	const footerDivs = document.querySelectorAll("footer div")
	footerDivs[0].textContent = store.name
	footerDivs[1].textContent = store.address
	footerDivs[2].textContent = store.hours
}

function renderBookCard(cardData) {
	const li = document.createElement("li")
	const h3 = document.createElement("h3")
	const pAuthor = document.createElement("p")
	const pPrice = document.createElement("p")
	const img = document.createElement("img")
	const btn = document.createElement("button")

	const pInv = document.createElement("p")
	const decInv = document.createElement("button")
	decInv.textContent = "SELL BOOK"

	h3.textContent = cardData.title
	pAuthor.textContent = cardData.author
	pPrice.textContent = `$${cardData.price}`
	btn.textContent = "Delete"

	pInv.textContent = cardData.inventory
	img.src = cardData.imageUrl
	li.className = "list-li"

	//Event Listeners
	// btn.addEventListener("click", e => {
	//     const deleteUrl = `http://localhost:3000/books/${cardData.id}`
	//     deleteResource(deleteUrl)
	//     .then(() => {
	//         console.log("Removed card of id: " + cardData.id)
	//         li.remove()
	//     })
	// })

	btn.addEventListener("click", (e) => handleDelete(cardData.id, li))
	decInv.addEventListener("click", (e) => {
		// e.preventDefault()
		console.log(cardData)
		// const patchUrl = "http://localhost:3000/books/" + 1
		const patchUrl = `http://localhost:3000/books/${cardData.id}`
		// ! DIFF between PATCH and PUT request
		// PATCH, will only update the given fields from the body
		//      ex: we just send the {inventory: newInventory}
		//      that's the only field that changes
		// PUT, will update the ENTIRE OBJECT based on the body
		//      ex: we just send the {inventory: newInventory}
		//      response => will just be the inventory and nothing else

		const newInventory = { inventory: cardData.inventory - 1 }
		updateResource(patchUrl, newInventory).then((updatedBookResource) => {
			console.log("inside fetch", updatedBookResource)
			// pInv.textContent = Number(pInv.textContent) - 1
			pInv.textContent = updatedBookResource.inventory
		})
	})

	li.append(h3, pAuthor, pPrice, pInv, decInv, img, btn)
	// debugger
	document.querySelector("#book-list").append(li)
}

// Event Handlers
function handleForm(e) {
	e.preventDefault()
	//Builds Book
	const book = {
		title: e.target.title.value,
		author: e.target.author.value,
		price: e.target.price.value,
		imageUrl: e.target.imageUrl.value,
		inventory: e.target.inventory.value,
		reviews: [],
	}
	createResources("http://localhost:3000/books", book)
		.then(renderBookCard)
		.catch((e) => console.error(e))
}

function handleDelete(id, target) {
	const deleteUrl = `http://localhost:3000/books/${id}`
	deleteResource(deleteUrl).then(() => {
		console.log("Removed card of id: " + id)
		target.remove()
	})
}

// Invoking functions
fetchResource("http://localhost:3000/stores/1")
	.then((store) => {
		renderHeader(store)
		renderFooter(store)
	})
	.catch((e) => console.error(e))

fetchResource("http://localhost:3000/books")
	.then((books) => books.forEach(renderBookCard))
	.catch((e) => console.error(e))

document.querySelector("#book-form").addEventListener("submit", handleForm)

// })
