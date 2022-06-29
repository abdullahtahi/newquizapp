import React, { useState } from 'react'
import "./App.css"
import Quiz from './Pages/Quiz/Quiz'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Result from './Pages/Result/Result'
import Header from './Component/Header/Header'

export default function App() {
  const [catagory, setcatagory] = useState()
  const [name, setname] = useState()
  const [difficulty, setdifficulty] = useState()
  return (
    <div className='container'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home
          setcatagory={setcatagory}
            catagory={catagory}
            setname={setname}
            name={name}
            setdifficulty={setdifficulty}
            difficult={difficulty}
          />} />
          <Route path="/quizpage" element={<Quiz
            catagory={catagory}
            name={name}
            difficult={difficulty}
          />} />
          <Route path="/result" element={<Result/>}/>

        </Routes>
      </Router>
    </div>
  )
}
