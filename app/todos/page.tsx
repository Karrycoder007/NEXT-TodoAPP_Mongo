"use client"
import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'

export default function Todos() {
 const [inputText, setInputText] = useState("")
 const [todos,setTodos] = useState([1,2,3])
 const [editMode,setEditMode] = useState(false)
 const [editTodoInfo,setEditTodoInfo] = useState({id:"",desc:"",completed:false})

 useEffect(()=>{
    axios.get("/api/todos").then(resp =>{
        console.log(resp.data)
        setTodos(resp.data.todos)
    })
 },[])

 async function addTodos() {
    const data = {
        desc:inputText,

    }
    const resp = await axios.post("/api/todos",data)
    console.log(resp)
    setTodos((prevTodos)=>[...prevTodos,{desc:inputText,completed:false}])
 }

 async function clearTodos() {
    const resp = await axios.delete("/api/todos")
    console.log(resp.data)

    setTodos([])
 }

 async function deleteTodos(todo) {
    const id = todo.id

    const resp = await axios.delete(`/api/todos/${id}`)

 }

 
 async function editTodos(todo) {
    setEditMode(true)
    setEditTodoInfo({
        id: todo.id,
        desc: todo.desc,
        completed:todo.completed
    })

 }

 async function updateTodo() {
    const data={
        desc:editTodoInfo.desc,
        completed:editTodoInfo.completed
    }
    const resp = await axios.put (`/api/todos/${editTodoInfo.id}`,data)
    setEditMode(false)
    
 }


 if (editMode) {
    return(
        <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
            <div className="text-4xl">Edit Todo</div>
            <div className="flex gap-4">
                <div className="text-lg">Edit Disc:</div>
                <input className="rounded-md shadow-md text-lg" type="text " placeholder="Enter new desc:"
                value={editTodoInfo.desc} onChange={(e=> setEditTodoInfo({...editTodoInfo,desc: e.target.value}))} />
            </div>
            <div className="flex gap-4">
                <div className="text-lg">Edit completed:</div>
                <input type="checkbox" name="" id="" checked={editTodoInfo.completed} onChange={e=>setEditTodoInfo({...editTodoInfo,completed: !editTodoInfo.completed})}/>
                
            </div>
            <button onClick={updateTodo} className="text-xl rounded-md shadow-md bg-blue-700 text-white hover:bg-blue-500 px-3 py-1">Submit</button>
        </div>
    )

 }
  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
        <div className="text-4xl  ">To do List </div>
        <div className="flex gap-2">
            <input className="text-xl rounded-md shadow-md" type="text " placeholder="Enter Todo" value={inputText} onChange={e=> setInputText(e.target.value)}/>
            <button onClick={addTodos} className="text-xl rounded-md shadow-md bg-blue-600 text-white hover:bg-blue-400 px-3 py-1">Add</button>
            <button onClick={clearTodos} className="text-xl rounded-md shadow-md bg-gray-700 text-white hover:bg-gray-500 px-3 py-1">Clear</button>
        </div>
        <div className="w-5/6 flex flex-col gap-2">
            {todos.map((todo,index)=>{
                return(
                    <div className="bg-violet-400 flex justify-between items-center p-2 rounded-lg shadow-md">
                        <div className="flex gap-2">
                            <input type="checkbox" checked={todo.completed}/>
                            <div className="text-lg text-white">{todo.desc}</div>
                        </div>
                        <div className="flex gap-2">
                                <button onClick={()=> editTodos(todo)} className="text-xl rounded-md shadow-md bg-green-600 text-white hover:bg-green-400 px-2">Edit</button>
                                <button onClick={()=> deleteTodos(todo)} className="text-xl rounded-md shadow-md bg-red-700 text-white hover:bg-red-500 px-2">Delete</button>
                            </div>
                    </div>

                )

            })}

        </div>
    </div>
    
  )
}
