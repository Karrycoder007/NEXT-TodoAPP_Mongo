import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/db";
import Todo from "@/app/models/todo"
import {v4} from "uuid"
 
connect()

function getIdFromPathname(s: String){
    let parts = s.split("/")
    return parts[parts.length - 1]
}

export async function GET(request: NextRequest){
    try {
       const path= request.nextUrl.pathname
       const id = getIdFromPathname(path)

       const todo = await Todo.findOne({id})


        return NextResponse.json({msg:"Found All Todos", success:true } )
        
    } catch (error) {
        return NextResponse.json({msg:"Issue happend!!"},{status:500})
        
    }



}

export async function DELETE(request:NextRequest){
    try {
        const path= request.nextUrl.pathname
        const id = getIdFromPathname(path)

        await Todo.deleteOne({id})

        return NextResponse.json({msg:"Todo Deleted ",succes:true})
        
    } catch (error) {
        return NextResponse.json({msg:"Issue happend!!"},{status:500})
    }
}

export async function PUT(request:NextRequest){
    try {
        const path = request.nextUrl.pathname
        const id = getIdFromPathname(path)

        const reqBody=await request.json()
        const{desc,completed}=reqBody
            

        await Todo.updateOne({id},{$set:{desc,completed}})
        return NextResponse.json({msg:"Todo Edited ",succes:true})

    } catch (error) {
        return NextResponse.json({msg:"Issue happend!!"},{status:500})
    }
}