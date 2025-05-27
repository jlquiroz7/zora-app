import { GEMINI_BASE_URL } from "../constants";

export async function POST(req) {
    const body = await req.json();
    const res = await fetch(`${GEMINI_BASE_URL}?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    return Response.json(data);
}