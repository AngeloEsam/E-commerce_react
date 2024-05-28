import { createContext, useState } from "react";

export let counterContext=createContext()
export default function CounterContextProvider(props){
    let [count,setCount]=useState(5)
    function change(){
        setCount(count+1)
    }
    return <counterContext.Provider value={{count,change}}>
        {props.children}
    </counterContext.Provider>
}