import { all, put, takeLatest, call } from 'redux-saga/effects'
import {SEARCH_MOVIE_REQUEST, searchMovieRequest, searchMovieSuccess} from '../store/actions'
import axios from "axios";
import {MovieRecord} from "../store/reducer";

function* fetchMovieAsync({ payload }: ReturnType<typeof searchMovieRequest>) {
    console.log('saga', payload);
    if (typeof payload === 'string') {
     const response: MovieRecord = yield call(callFetchMovieAsync(payload));
     console.log('saga response: ', response);
     yield put(searchMovieSuccess(response))
    }
}


function callFetchMovieAsync(inputText : string) {
    return () => {
        return axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${inputText}`)
            .then(response => {
                if (response.status === 404) {
                    console.log('No data found in API');
                    return;
                }
                console.log(response.data);
                let data = response.data;

                // I thought this will return array, but it returns only one object instead...
                /* obj.forEach( data => {
                     const movieRecord = {id: data.id, movie: {image: data.image.medium, name: data.name, url: data.url}}
                })*/
                return {id: data.id, movie: {image: data.image.medium, name: data.name, url: data.url, summary: data.summary}}
            }).catch((error) => {
                console.error('Error:', error);
            })
    }
 }

function* actionWatcher() {
    yield takeLatest(SEARCH_MOVIE_REQUEST, fetchMovieAsync);
}
export default function* rootSaga() {
    yield all([actionWatcher()]);
}