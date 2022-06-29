import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchMain from './components/Search/SearchMain';
import Main from './BasicLayout/Main';
import Test from './Test/Test';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Main />} />
                <Route path="/add" element={<SearchMain />} />
                {/* <Route path="/test" element={<Test />} /> */}
            </Routes>
        </Router>
    );
}

export default App;