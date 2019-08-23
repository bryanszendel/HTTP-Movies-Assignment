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
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        setMovie(res.data)
      })
      .catch(err => console.log(err.response))
  }, [])

  const changeHandler = ev => {
    ev.persist()
    let value = ev.target.value
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10)
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
        props.updateMovies(res.data)
        props.history.push(`/movies/${movie.id}`)
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div>
      <h4>Update Movie Here</h4>
      <form onSubmit={handleSubmit} action="/">
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