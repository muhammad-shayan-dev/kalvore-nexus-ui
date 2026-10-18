import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { use_case, query } = body;

    // Direct Gemini AI simulation for Kalvore Nexus Hackathon Demo
    const responseData = {
      ticket_id: `KALVORE-${Math.floor(1000 + Math.random() * 9000)}`,
      severity: use_case === "it_support" ? "P1" : "Urgent",
      category: "Hardware & System Reliability",
      summary: `Analyzed query: "${query}"`,
      root_cause_hypothesis: "Critical system instability identified requiring immediate intervention.",
      resolution_steps: [
        "Isolate affected hardware components and run diagnostics.",
        "Check system event logs for fatal error codes.",
        "Initiate emergency failover protocol to prevent data loss."
      ],
      assigned_team: "Elite Enterprise Operations",
      estimated_resolution_time: "15min",
      requires_escalation: true,
      status: "SUCCESS"
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}