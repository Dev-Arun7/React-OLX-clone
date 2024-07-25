import { useReducer } from 'react'

const initialValue = 10
const reducer = (state, action) => {
    return true
}

let result = useReducer(reducer, initialValue)

console.log(result)