import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SearchWord from './components/SearchWord/SearchWord';
import { useState } from 'react';

function App() {
    const [showWord, setShowWord] = useState();

    const onGetWordHandler = entered => {
        setShowWord(entered);
    };

    return (
        <div className="App px-4 py-4 h-screen bg-slate-500 overflow-y-auto overflow-x-hidden">
            <Router>
                <section className="flex justify-between">
                    <div className="font-bold">Search English Word</div>
                    <NavBar />
                </section>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/search-word"
                        element={<SearchWord onGetWord={onGetWordHandler} />}
                    />
                    <Route />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
