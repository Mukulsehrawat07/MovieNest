# MovieNest

MovieNest is a personal movie watchlist app that helps you collect, organize, and revisit films you love or plan to watch. It's designed to be simple, accessible, and fun — your own digital "nest" for cinema, where every movie you add feels right at home.

**Live Demo:** https://movienest-mk.netlify.app/

## Features

- Search for movies using the OMDB API
- Add movies to your personal watchlist
- View detailed movie information (title, year, rating, plot, etc.)
- Remove movies from your watchlist
- Responsive design with a retro Windows-inspired UI
- Local storage for watchlist persistence

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/MovieNest.git
   cd MovieNest
   ```

2. Get an OMDB API key:
   - Visit [OMDB API](https://www.omdbapi.com/apikey.aspx)
   - Sign up for a free API key

3. Set your API key in `index.js`:
   - Open `index.js`
   - Replace `YOUR_OMDB_API_KEY_HERE` with your actual API key:
     ```javascript
     const OMDB_API_KEY = "your_actual_api_key_here";
     ```

4. Open `index.html` in your browser or use a local server:
   - For a local server, you can use Live Server extension in VS Code or run:
     ```bash
     python -m http.server 8000
     ```
   - Then open `http://localhost:8000` in your browser

## Usage

1. **Search for Movies**: Enter a movie title in the search bar and click "Search"
2. **Add to Watchlist**: Click the "Watchlist" button on any movie card
3. **View Watchlist**: Click "My Watchlist" in the navigation to see your saved movies
4. **Remove from Watchlist**: Click "Remove" on any movie in your watchlist

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- OMDB API for movie data

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
