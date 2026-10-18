import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Aapka apna Asli n8n Production Webhook URL
    const n8nWebhookUrl = "https://muhammadsha75.app.n8n.cloud/webhook/kalvore-nexus";

    // n8n cloud engine ko server-side request bhejna
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n engine responded with status: ${n8nResponse.status}`);
    }

    const responseData = await n8nResponse.json();

    // n8n se jo structured JSON response aaya, usay frontend par wapas bhejna
    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error("Kalvore Engine Connection Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Kalvore Engine" }, 
      { status: 500 }
    );
  }
}