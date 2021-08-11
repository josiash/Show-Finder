import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer} from "./reducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../sagas/saga";

const rootReducer = combineReducers({movieState:reducer});
export type RootState = ReturnType<typeof rootReducer>;
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);