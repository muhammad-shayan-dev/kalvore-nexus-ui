import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Aapka asli N8N Production Webhook URL
    const n8nUrl = "https://muhammadsha75.app.n8n.cloud/webhook/kalvore-nexus";

    // N8N Engine ko request bhejna
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // N8N se jo JSON response aya usay wapas frontend ko bhejna
    const responseData = await response.json();

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("N8N Error:", error);
    return NextResponse.json({ error: "Failed to connect to Kalvore Engine" }, { status: 500 });
  }
}