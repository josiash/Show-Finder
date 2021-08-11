import {Action, SEARCH_MOVIE_SUCCESS, ADD_MOVIE, REMOVE_MOVIE, CLEAR_SEARCH_MOVIE} from "./actions";

export interface MoviesState {
    selectedMovies: MovieRecord[];
    searchMovies: MovieRecord[];
}

export interface MovieRecord {
    id: number,
    movie:MovieData
}

interface MovieData {
    url: string,
    name: string,
    image: string,
    summary : string
}

const initialState: MoviesState = {selectedMovies:[],searchMovies:[]};

export const reducer = (state = initialState, action: Action) => {

    switch (action.type) {
        case SEARCH_MOVIE_SUCCESS: {
            console.log('search');
            console.log(action.payload);
            if (action.payload && !state.searchMovies.find(movie => movie.id === action.payload.id)) {
                let newState = {
                    ...state,
                    searchMovies: [
                        {
                            id: action.payload.id,
                            movie: {
                                name: action.payload.movie.name,
                                url: action.payload.movie.url,
                                image: action.payload.movie.image,
                                summary: action.payload.movie.summary
                            }
                        }]
                }
                console.log(newState);
                return newState;
            }
            return state;
        }
        case CLEAR_SEARCH_MOVIE: {
            console.log('clear');
                return {
                    ...state,
                    searchMovies: []
                }
        }
        case ADD_MOVIE: {
            console.log('add', action.payload);
            if (!state.selectedMovies.find(movie => movie.id === action.payload.id)) {
                let newState = {
                    ...state,
                    selectedMovies: [...state.selectedMovies,
                        {
                            id: action.payload.id,
                            movie: {
                                name: action.payload.movie.name,
                                url: action.payload.movie.url,
                                image: action.payload.movie.image,
                                summary: action.payload.movie.summary
                            }
                        }]
                }
                console.log(newState);
                return newState;
            }
            return state;
        }
        case REMOVE_MOVIE: {
            console.log('remove');
            console.log(action.payload);

            let newState = {
                ...state,
                selectedMovies: state.selectedMovies.filter(item => item.id !== action.payload.id)
            }
            console.log(newState)
            return newState;
        }
        default :
            return state;
    }
}