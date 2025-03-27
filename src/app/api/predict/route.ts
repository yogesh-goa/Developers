import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData(); // Get the FormData from request

        // Your FastAPI backend URL
        const fastApiUrl = "https://c82f-35-185-198-212.ngrok-free.app/predict";

        // Forward the request to FastAPI
        const response = await fetch(fastApiUrl, {
            method: "POST",
            body: formData, // Send the same FormData
            headers: {
                // Do NOT set 'Content-Type', browser will handle it
            },
        });

        // Get response from FastAPI
        const data = await response.json();
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to proxy request", details: error.message }, { status: 500 });
    }
}
