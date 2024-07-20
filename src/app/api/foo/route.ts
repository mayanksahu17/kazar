import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    const formadata = await req.formData();
    const File =  formadata.get("File");
        if (File) {
        
        return NextResponse.json({
            message : 'le re lund ke',
            file : File
//
        })
    }
    return NextResponse.json({
        success : true
    })
    
}