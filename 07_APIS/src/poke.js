// Code Here 👀

/* 
	What is an API?
	- Application Program Interface
	- What does that Mean???
		- User's experience with an application's data
		- Does not need a visual (Graphical User Interface (GUI))
		- HOW WE INTERACT WITH THE DATA(BASE)

	Local Examples:
		- json-server --watch db.json
		- Flask (Python Phase 4)
	External Examples
		- AWS
		- OAuth(2.0)
		- Weather API
			- Send a req with a location
			- Responds with the weather
		- Recipe.db
		- Pokemon API
		- NASA API


*/

const BASE_URL = "https://pokeapi.co/api/v2/"
const ENDPOINTS = {
	pokemon: "pokemon",
	ability: "ability",
	berry: "berry",
}
const pokeContainer = document.getElementById("poke-container")
const pokeSearch = document.getElementById("poke-search")

const getPokemon = (pokeName) => {
	fetch(`${BASE_URL}${ENDPOINTS.pokemon}/${pokeName}`)
		.then((res) => res.json())
		.then((pokemonInfo) => {
			console.log(pokemonInfo)
			renderPokeCard(pokemonInfo)
		})
		.catch(err => console.log({"error": err}))
}

const getCharmander = () => {
	// fetch("https://pokeapi.co/api/v2/pokemon/charmander")
	fetch(`${BASE_URL}${ENDPOINTS.pokemon}/charmander`)
		.then((res) => res.json())
		.then((pokemonInfo) => {
			console.log(pokemonInfo)
			renderPokeCard(pokemonInfo)
		})
}

const renderPokeCard = (pokemonData) => {
	// name, sprites.front_shiny, sprites.front_default
	const type = pokemonData.types[0].type.name
	const front = pokemonData.sprites.front_default
	const frontShiny = pokemonData.sprites.front_shiny
	const name = pokemonData.name
	const stats = pokemonData.stats

	// debugger
	const card = document.createElement("div")
	const nameTag = document.createElement("h2")
	const typeTag = document.createElement("p")
	const sprite = document.createElement("img")
	const statList = document.createElement("ul")

	nameTag.textContent = name
	typeTag.textContent = type
	sprite.src = frontShiny
	sprite.alt = name

	stats.forEach((statObj) => {
		const li = document.createElement("li")
		li.textContent = `${statObj.stat.name} => ${statObj.base_stat}`
		statList.append(li)
	})

	card.append(nameTag, typeTag, sprite, statList)
	pokeContainer.prepend(card)
}

const handleSearch = (e) => {
	e.preventDefault()
	// console.log(e.target.search.value)
	getPokemon(e.target.search.value)
}

const init = () => {
	// getCharmander()

	pokeSearch.addEventListener("submit", handleSearch)
}

init()
