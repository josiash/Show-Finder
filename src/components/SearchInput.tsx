import React, { ChangeEvent } from "react";
import sanitizeHtml from 'sanitize-html';
import {MovieRecord, MoviesState} from "../store/reducer";
import {useDispatch, useSelector} from "react-redux";
import {addMovie, clearMovieRequest, searchMovieRequest} from "../store/actions";
import cssClasses from "./SearchInput.module.css";
import {RootState} from "../store/store";

export const SearchInput = () => {

    const [searchQuery, setSearchQuery] = React.useState("");
    const dispatch = useDispatch();
    const searchMovies: MoviesState["searchMovies"] = useSelector((rootState: RootState) => rootState.movieState.searchMovies);

    const onAddMovie = (movie : MovieRecord) => () => {
        console.log(movie);
        dispatch(addMovie(movie));
    }

    const updateSearch = async (event : ChangeEvent<HTMLInputElement>) => {
        let inputSearchText = event.target.value;
        if (inputSearchText.length !== 0) {
            console.log('search input');
            dispatch(searchMovieRequest(inputSearchText));
        } else {
            dispatch(clearMovieRequest(''));
        }
        setSearchQuery(() => inputSearchText);
        console.log(searchQuery);
    }

    return (
        <>
            <div className={cssClasses.searchBar}>
                <label htmlFor="searchMovie">Show Finder</label>
                <input onChange={updateSearch} value={searchQuery} type="search" name="searchMovie" placeholder="Search here"/>
            </div>
            {searchQuery &&
            <div className={cssClasses.searchList}>
                <ul>
                    {searchMovies.map((movieRecord: MovieRecord) => {
                        return (
                            <li key={movieRecord.id} className={cssClasses.movie} onClick={onAddMovie(movieRecord)}>
                                <h3>{movieRecord.movie.name}</h3>
                                <div className={cssClasses.movieDetails}>
                                    <span className={cssClasses.movieImage}><img width="70" src={movieRecord.movie.image} alt={movieRecord.movie.name}/></span>
                                    <span className={cssClasses.movieSummary} dangerouslySetInnerHTML={{__html:sanitizeHtml(movieRecord.movie.summary)}}></span>
                                </div>
                            </li> )
                    })}
                </ul>
            </div>
            }
        </>
    )
}