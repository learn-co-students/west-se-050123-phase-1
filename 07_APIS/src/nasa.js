const nasaContainer = document.getElementById("nasa-container")

const sendRequest = e => {
	fetch(`${NASA_URL}?api_key=${api_key}`)
	.then(res => res.json())
	.then(apodData => {
		console.log(apodData)
		renderAPOD(apodData)
	})
}

const renderAPOD = data => {
	const card = document.createElement("div")
	const title = document.createElement("h1")
	const explanation = document.createElement("p")
	const pic = document.createElement("img")

	title.textContent = data.title
	explanation.textContent = data.explanation
	pic.src = data.hdurl
	pic.alt = data.title
	pic.height = "400"
	pic.width = "400"

	card.append(title, pic, explanation)
	nasaContainer.append(card)

}

document.getElementById("apod-btn").addEventListener("click", sendRequest)