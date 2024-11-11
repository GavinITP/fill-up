'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export async function createReport(stationId: string, stationName: string, name: string, description: string) {
    const session = await getServerSession(authOptions);
    const token = session?.user.token;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/reportservice/report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            stationId: stationId,
            stationName: stationName,
            name: name,
            description: description
        })
    })
    if (!response.ok) {
        return false
    }
    return true
}