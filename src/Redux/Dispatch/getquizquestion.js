const initialState = {quiz:[]}

export default function getquizquestion (state = initialState,action)  {
  switch (action.type) {

  case "GETQUIZ_LOADING":
    return { 
        Loading:true,
        quiz:[]
     }
     case "GETQUIZ_SUCCESS":
        return { 
            Loading:false,
            quiz:action.payload
         }
  default:
    return state
  }
}
