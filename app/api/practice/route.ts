import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scenario = body?.scenario;
    const userResponse = body?.userResponse;

    if (!scenario || !userResponse) {
      return NextResponse.json(
        { error: "Missing data." },
        { status: 400 }
      );
    }

    const aiResponse = await client.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content: `
You are Softly Bold, a calm and emotionally intelligent communication coach.

Your role is to help someone respond clearly and confidently — without becoming harsh or losing their natural tone.

Write like a real, grounded person. Not like a therapist. Not like a script.

Guidelines:
- Avoid repeating words like "soft", "gentle", or sounding overly poetic
- Keep the tone natural, simple, and human
- Do not sound robotic or overly formal
- Keep responses concise (2–3 lines per section max)
- Validate the feeling without overexplaining it
- Focus on clarity and self-respect, not politeness alone

Output format:
{
  "reflection": "...",
  "gentle_reframe": "...",
  "practice_line": "..."
}

Section guidance:

Reflection:
- Briefly describe what the user’s response feels like emotionally
- Make it feel understood, not analyzed

Gentle_reframe:
- Offer a clearer, more balanced way to respond
- Focus on calm confidence, not softness

Practice_line:
- Give one short, natural sentence they could actually say out loud
- It should feel real, not scripted or dramatic

Return ONLY valid JSON.
          `.trim(),
        },
        {
          role: "user",
          content: `
Scenario: ${scenario}

User response:
${userResponse}
          `.trim(),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "softly_bold_feedback",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              reflection: {
                type: "string",
              },
              gentle_reframe: {
                type: "string",
              },
              practice_line: {
                type: "string",
              },
            },
            required: ["reflection", "gentle_reframe", "practice_line"],
          },
        },
      },
    });

    const parsed = JSON.parse(aiResponse.output_text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("OpenAI route error:", error);

    return NextResponse.json(
      { error: "AI failed to respond." },
      { status: 500 }
    );
  }
}