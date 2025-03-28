import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { inputString } = await request.json();
    console.log("B")
    const API_URL = 'https://6beb-35-185-198-212.ngrok-free.app'; // Replace with your ngrok URL
    // Format the input string as a JSON array string
    const formattedInput = inputString;
    console.log(JSON.stringify({
        input_array: formattedInput,
      }))
    
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_array: formattedInput,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Prediction failed' }, { status: response.status });
    }

    return NextResponse.json({ prediction: data.prediction });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}