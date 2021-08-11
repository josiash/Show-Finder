import cssClasses from "./MyMovies.module.css";
import {MovieRecord, MoviesState} from "../store/reducer";
import {useDispatch, useSelector} from "react-redux";
import {removeMovie} from "../store/actions";
import {RootState} from "../store/store";
import sanitizeHtml from "sanitize-html";

export const MyMovies = () => {

    const dispatch = useDispatch();
    const myMovies: MoviesState["selectedMovies"] = useSelector((rootState: RootState) => rootState.movieState.selectedMovies);

    const removeMovieHandler = (movieRecord: MovieRecord) => () => {
        console.log(movieRecord);
        dispatch(removeMovie(movieRecord));
    }

    /**
     * dangerouslySetInnerHTML in the last span is just to nicely show the content of summary.
     * Unfortunately API provides summary as a HTML markup, this is why there is sanitization
     */
    return (
        <div className={cssClasses.movieList}>
            <h2>My films</h2>
            <ul>
                {myMovies.map((movieRecord: MovieRecord) => {
                    return <li key={movieRecord.id} className={cssClasses.movie} onClick={removeMovieHandler(movieRecord)}>
                        <h3>{movieRecord.movie.name}</h3>
                        <div className={cssClasses.movieDetails}>
                            <span className={cssClasses.movieImage}><img width="70" src={movieRecord.movie.image} alt={movieRecord.movie.name}/></span>
                            <span className={cssClasses.movieSummary} dangerouslySetInnerHTML={{__html:sanitizeHtml(movieRecord.movie.summary)}}></span>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}