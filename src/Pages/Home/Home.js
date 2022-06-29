import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import "./Home.css"
import { CatagoryData } from '../../Component/catagoryData/CatagoryData';
import ErrorMessage from '../../Component/ErrorMessage/ErrorMessage';
import { useNavigate } from "react-router-dom"
import backgroundimg from "../../Component/images/backgroundimg.svg"
export default function Home({
    takequestion,
    setcatagory,
    catagory,
    setname,
    name,
    setdifficulty,
    difficult,
}) {
    const navigate = useNavigate()
    const [error, seterror] = useState(false)

    const handlesubmit = (e) => {
        if (!name || !difficult || !catagory) {
            seterror("The field is required")
            return;
        }
        else {
            seterror(false)
            navigate("/quizpage")
        }
    }
    console.log(name, catagory, difficult)
    return (
<div style={{
    backgroundImage:`url(${backgroundimg})`,
    height:'100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}}>
<div>
            {
                error && <ErrorMessage >{error}</ErrorMessage>
            }


            <div className='username'>
                <TextField
                    // style={{width:"250px"}}
                    className='username_input'
                    id="outlined-basic"  
                    variant="outlined"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
             label="Enter a Name"
                />
            </div>
            <div className='quizcatagory'>
                <TextField
                    className='quizcatagory_input'
                    select
                    variant="outlined"
                    label="Choose the Catagory"
                    onChange={(e) => setcatagory(e.target.value)}
                    value={catagory}
                    >

                    {
                        CatagoryData.map((e) => <MenuItem value={e.category}>{e.category}</MenuItem>
                        )
                    }
                </TextField>
            </div>
            <div className='quizdiffculty'>
                <TextField
                    className='quizdiffculty_input'
                    label='Select the Difficulty Level'
                    onChange={(e) => setdifficulty(e.target.value)}
                    value={difficult}
                    select variant='outlined'>
                    <MenuItem kery value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                </TextField>
            </div>
            <div className='btn'>
                <button className="btn btn-success" onClick={handlesubmit}> submit</button>
            </div>
        </div>
        </div>
    )
}
