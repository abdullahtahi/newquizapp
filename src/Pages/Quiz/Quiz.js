import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core';
import ErrorMessage from '../../Component/ErrorMessage/ErrorMessage';
import { useNavigate } from "react-router-dom"
import transitions from '@material-ui/core/styles/transitions';
import { current } from '@reduxjs/toolkit';
import "./Quiz.css"
import Button from '@mui/material/Button';
export default function Quiz({
    catagory,
    name,
    difficult }) {
    // console.log(name,)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    // const [quizquestion, setquizquestion] = useState()
    var initialState = 0;
    const [currquestion, setcurrquestion] = useState(initialState)
    const [option, setoption] = useState()
    const [score, setscore] = useState(0)
    const [selected, setselected] = useState()
    const [error, seterror] = useState()
    const [correctans, setcorrectans] = useState()
    console.log(currquestion)
    const quizquestionnext = () => {
        if (!selected) {
            // setoptionerror(true)
            seterror("select any value")
        }
        else if (currquestion > 9) {
            setoption()
            navigate("/result")
        }

        else {
            setcurrquestion(currquestion + 1)
            setselected()
        }

    }

    const handlecheck = (e) => {
        console.log(e)
        setselected(e)
        if (e === correctans) {
            setscore(score + 1)
        } else {
            seterror(true)
        }
    }
    // console.log(quizquestion[currquestion])
    // console.log('the values of the catagory and diffculty',catagory,difficult)
    //  https://opentdb.com/api.php?amount=10&${catagory&&`&category=${catagory}`}${difficult&&`&difficulty=${difficult}`}&type=multiple`
    //catagory &&catagory={category}it means if the catagory is avaliable then show it
    //https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple
    const question = async () => {
        try {
            setloading(true)
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple`);
        console.log(data)
        dispatch({
            type: "GETQUIZ_LOADING",
        })
        dispatch({
            type: "GETQUIZ_SUCCESS",
            payload: data.results
        })
        setloading(false)

        } catch (error) {
        console.log(error)            
        }    }
    const { Loading, quiz } = useSelector((state) => state.getquestion)
    useEffect(() => {
        question();
    }, [])
    const handlesuffle = (option) => {
        return option.sort(() => Math.random() - 0.5)
    }
    useEffect(() => {
        quiz &&setoption(
         handlesuffle([
              quiz[currquestion]?.correct_answer??[],
          ...quiz[currquestion]?.incorrect_answers??[]]))   
        setcorrectans(quiz[currquestion]?.correct_answer)
    },[quiz,currquestion])
    console.log(quiz)
    console.log(option)
    return (
        <div className='questionbody'>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className='questionAppear'>
            <div>Score:{score}</div>
            {loading?<CircularProgress  style={{    
        }}
          color="inherit"
          size={150}
          thickness={1}/>:
          <div className=''>
                <p>Question{currquestion+1}</p>
                <h1>{quiz[currquestion]?.question}</h1>
                <div className="option">
                    {option && option.map((e,l) => <Button variant='outline' style={{border:"1px solid green",margin:"10px"}} key={l} id='button' disabled={selected} onClick={() => handlecheck(e)}>{e}</Button>)
                    }
                </div>
            </div>
            }
            <div className='btns' style={{ display: "flex", justifyContent: "space-between" }}>
                <div className='btnmain_scr'>
                    <button className='btn btn-primary' style={{ width: "200px" }}>Main Screen</button>
                </div>
                <div className='btn_next'>
                    <button style={{ width: "200px" }}
                        className='btn btn-success'
                        onClick={quizquestionnext}
                    >Next</button>
                </div>
            </div>




            </div>
            
                    </div>
    )
}
