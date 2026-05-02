import { useState, type MouseEvent } from "react"
import { OMDB_API_KEY } from "./api_key"

// Janky little solution because we're not using a backend
let nextId = 1

// Let the computer know what our objects will look like
// This isn't itself an object, it's the blueprint of an object
// Documentation
type Movie = {
	id: number
	title: string
	numberOfStars: number
	review: string
	imgSrc: string
}

// A lil function to get the poster that matches a title
const getMoviePosterURL = async (title: string) => {
	const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`)
	const data = await response.json()
	return data.Poster
}

export default function App() {
	// Form state
	const [titleValue, setTitleValue] = useState("")
	const [reviewValue, setReviewValue] = useState("")
	const [starsValue, setStarsValue] = useState("1")

	// Movies
	const [movieList, setMovieList] = useState<Movie[]>([])

	const addMovie = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault() // prevent the page from refreshing

		const posterURL = await getMoviePosterURL(titleValue)

		const newMovie = {
			id: nextId++, // lil trick to increment the id for next movie added
			title: titleValue,
			numberOfStars: parseInt(starsValue), // select gives a string, but I want a number
			review: reviewValue,
			imgSrc: posterURL
		}

		// Add newMovie to our array in state
		//setSomeArray([...someArray, newItem ])
		setMovieList([...movieList, newMovie])

		// Clear the form
		setTitleValue("")
		setReviewValue("")
		setStarsValue("1")
	}

	return (
		<div className="m-4">
			<h2 className="text-4xl font-medium mb-5">Movie Reviews</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="title-input" className="block">Title</label>
					<input
						onChange={(event) => setTitleValue(event.target.value)}
						value={titleValue}
						id="title-input"
						type="text"
						className="border border-gray-400 rounded-lg p-2 w-100"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="stars-input" className="block">Number of Stars</label>
					<select
						onChange={(event) => setStarsValue(event.target.value)}
						value={starsValue}
						id="stars-input"
						className="border border-gray-400 rounded-lg p-2 w-100"
					>
						<option value="1">⭐</option>
						<option value="2">⭐⭐</option>
						<option value="3">⭐⭐⭐</option>
						<option value="4">⭐⭐⭐⭐</option>
						<option value="5">⭐⭐⭐⭐⭐</option>
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="review-input" className="block">Review</label>
					<textarea
						onChange={(event) => setReviewValue(event.target.value)}
						value={reviewValue}
						id="review-input"
						className="border border-gray-400 rounded-lg p-2 w-100 h-20"
					></textarea>
				</div>
				<button onClick={addMovie} className="mb-3 bg-blue-900 text-white shadow p-4 rounded-lg">Submit</button>
			</form>
			<div>
				{movieList.map(movie => (
					<div key={movie.id} className="flex gap-3 mb-4 border rounded-lg border-gray-300 p-4 bg-gray-200">
						<img className="w-50" src={movie.imgSrc} />
						<div>
							<h4 className="text-2xl font-bold">{movie.title}</h4>
							<p className="my-3">{Array(movie.numberOfStars).fill("⭐")}</p>
							<p className="ms-1">{movie.review}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}