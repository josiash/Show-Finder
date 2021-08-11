import React from 'react';
import {SearchInput} from "./components/SearchInput";
import {MyMovies} from "./components/MyMovies";

function App() {
    return (
        <div className="App">
            <SearchInput/>
            <MyMovies />
        </div>
    );
}
export default App;