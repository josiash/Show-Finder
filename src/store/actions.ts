import {MovieRecord} from "./reducer";

export const SEARCH_MOVIE_REQUEST = "SEARCH_MOVIE_REQUEST";
export const SEARCH_MOVIE_SUCCESS = "SEARCH_MOVIE_SUCCESS";
export const CLEAR_SEARCH_MOVIE = "CLEAR_SEARCH_MOVIE";
export const ADD_MOVIE = "ADD_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";

interface ActionSearchRequest {
    type: typeof SEARCH_MOVIE_REQUEST;
    payload: string;
}

interface ActionSearchSuccess {
    type: typeof SEARCH_MOVIE_SUCCESS;
    payload: MovieRecord;
}

interface ActionClearSearch {
    type: typeof CLEAR_SEARCH_MOVIE;
    payload: string;
}

interface ActionAdd {
    type: typeof ADD_MOVIE;
    payload: MovieRecord;
}

interface ActionRemove {
    type: typeof REMOVE_MOVIE;
    payload: MovieRecord;
}

export type Action = ActionSearchRequest | ActionSearchSuccess | ActionClearSearch | ActionAdd | ActionRemove;

export const searchMovieSuccess = (movie: MovieRecord): Action => {
    return {type: SEARCH_MOVIE_SUCCESS, payload: movie}
};

export const searchMovieRequest = (movie: string): Action => {
    return {type: SEARCH_MOVIE_REQUEST, payload: movie}
};

export const clearMovieRequest = (movie: string): Action => {
    return {type: CLEAR_SEARCH_MOVIE, payload: movie}
};

export const addMovie = (movie: MovieRecord): Action => {
    return {type: ADD_MOVIE, payload: movie}
};

export const removeMovie = (movie: MovieRecord): Action => {
    return {type: REMOVE_MOVIE, payload: movie}
};