import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [copy, setCopy] = useState([]);
  const [fav, setFav] = useState([]);
  const handelFav = (e) => {
    let temp = movies[e.target.id]
    setFav([...fav, temp])
  };

  const handelSearch = (e) => {
    let temp = movies.filter((each) => {
      return (each.Title.includes(e.target.value))
    })
    setCopy(temp)
  }

  useEffect(() => {
    fetch("https://www.omdbapi.com/?&apikey=e81ad9e6&s=you")
      .then(resp => resp.json())
      .then(data => {
        setMovies(data.Search)
        setCopy(data.Search)
      })

  }, []);
  return (
    <>
      <div className="container">
        <div className="searchbar">
          <h2 className="heading">Movies</h2>
          <input onChange={(e) => handelSearch(e)} type="text" placeholder="search movie" />
        </div>
        <div className="App">
          {
            copy.map((each, i) => {
              return (
                <div key={i} className="mov-poster" >
                  <img src={each.Poster} alt="poster" />
                  <button id={i} onClick={(e) => handelFav(e)} className="hide">Add To Favourite ♥</button>
                </div>
              )
            })
          }
        </div>
        <div>
          <div>
            <h3 className="fav">Favourite</h3>
            <div className="App">
              {
                fav.map((each, i) => {
                  return (
                    <div key={i} className="mov-poster" >
                      <img src={each.Poster} alt="poster" />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
