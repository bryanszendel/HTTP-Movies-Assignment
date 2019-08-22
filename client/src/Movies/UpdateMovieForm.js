import React, { useState, useEffect } from 'react';
import axios from 'axios'

const initialMovieInfo = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovieForm = props => {
  console.log(props)
  const [movie, setMovie] = useState(initialMovieInfo)
  useEffect(() => {
    const id = props.match.params.id
    console.log('props.movies', props.movies)
    const movieInArr = props.movies.find(movie => `${movie.id}` === id)
    if (movieInArr) setMovie(movieInArr)
  }, [props.movies, props.match.params.id])

  const changeHandler = ev => {
    ev.persist() //not sure what this does, but putting it here
    let value = ev.target.value
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10) // I'd like to understand this, but for now I don't
    }

    setMovie({
      ...movie,
      [ev.target.name]: ev.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie) //change id
      .then(res => {
        console.log('server PUT response', res)
        setMovie(initialMovieInfo)
        props.updateMovies(res.data) // need to pass updateMovies through
        props.history.push('/movies') // don't know what this does
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div>
      <h4>Update Movie Here</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Movie Title"
          value={movie.title} 
        />
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateMovieForm;