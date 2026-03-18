const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const resultsContainer = document.getElementById("results")
const watchlistContainer = document.getElementById("watchlist")
const messageContainer = document.getElementById("message")

const addIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>`

const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>
`

let searchResults = []

async function handleClick(e) {
    e.preventDefault()
    const query = searchInput.ariaValueMax
    
    // message if input is empty
    
    if (!query) {
        messageContainer.textContent = "Unable to find what you're looking for. Please try another search."
    } else {
        const res = await fetch(`/api/search?s=${query}`)
        const data = await res.json()
        
        // message if search is void
        if (!data.Search) {
            messageContainer.textContent = "no results found, try another search."
            return
        }
        
        // wait so both searches display at same time 
        searchResults = await Promise.all(
            data.Search.map((movie) =>
            fetch(`/api/search?i=${movie.imdbID}`,).then((res) => res.json()),
            ),
        )
        // should filter out results with bad data 
        searchResults = searchResults.filter((m) => m.response !== "False")
        render(searchResults)
        updateButtons()
    }
}

if (searchBtn) {
    searchBtn.addEventListener("click", handleClick)
}

// map over results and display

const render = (movies) => {
    resultsContainer.innerHTML = movies.map((data) => 
    
            `<article class="film-card">
        <div class="left-container">
            <img
            src="${data.Poster}"
            alt="${data.Title} poster"
            onerror="this.src = 'imgs/noimg.jpg'"
            />

            <button class="watchlist-btn" data-id="${data.imdbID}">
            ${addIcon} Watchlist
            </button>
        </div>
        <div class="film-info">
            <div class="film-title-row">
            <h2>${data.Title}</h2>
            <span class="rating">${starIcon} ${data.imdbRating} </span>
            </div>
            <div class="meta-row">
            <span class="year">${data.Year}</span>
            <span class="dot"></span>
            <span class="runtime">${data.Runtime}</span>
            <span class="dot"></span>
            <span class="genres">${data.Genre}</span>
            </div>
            <p class="synopsis">${data.Plot}</p>
        </div>
        </article>`,).join("")
}

// update watchlist/remove buttons depending on whats in localstorage

const updateButtons = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    const buttons = document.getElementById(".watchlist-btn")
    
    buttons.forEach((btn) => {
        const isInWatclist = watchlist.find((m) => m.imdbID === btn.dataset.id)
        if (isInWatclist) {
            btn.classlist.add("remove")
            btn.innerHTML = `${removeIcon} Remove`
        }
    })
}

// add/remove localstorage when button clicked

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".watchlist-btn")
    
    if (btn) {
        const id = btn.dataset.id
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
        const movieObject = searchResults.find((m) => m.imdbID === id)
        
        btn.classlist.toggle("remove")
        
        if (btn.classlist.contains("remove")) {
            if (movieObject) {
                watchlist.push(movieObject)
                localStorage.setItem("watchlist", JSON.stringify(watchlist))
            }
            btn.innerHTML = `${removeIcon} Remove`
        } else {
            const updated = watchlist.filter((m) => m.imdbID !== id)
            localStorage.setItem("watchlist", JSON.stringify(updated))
             btn.innerHTML = `${addIcon} Watchlist`
             
             // rerender if on watchlist page so removals vanish instantly
             
             if (watchlistContainer) {
                renderWatchlist()
             }
        }
    }
})

const renderWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    
    // display message if watchlist is empty
    
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `<div class="message">
    <img src="imgs/pixl3.gif" alt="cute green ghost" />
          Your watchlist is looking a little empty...
        </div>`
        return
    }
    
    watchlistContainer.innerHTML = watchlist.map((data) => 
            ` <article class="film-card">
        <div class="left-container">
            <img
            src="${data.Poster}"
            alt="${data.Title} poster"
            onerror="this.src = 'noimg.jpg'"
            />

            <button class="watchlist-btn" data-id="${data.imdbID}">
            ${addIcon} Watchlist
            </button>
        </div>
        <div class="film-info">
            <div class="film-title-row">
            <h2>${data.Title}</h2>
            <span class="rating">${starIcon} ${data.imdbRating} </span>
            </div>
            <div class="meta-row">
            <span class="year">${data.Year}</span>
            <span class="dot"></span>
            <span class="runtime">${data.Runtime}</span>
            <span class="dot"></span>
            <span class="genres">${data.Genre}</span>
            </div>
            <p class="synopsis">${data.Plot}</p>
        </div>
        </article>`,).join("")
        
        updateButtons()
}

if (watchlistContainer) {
    renderWatchlist()
}