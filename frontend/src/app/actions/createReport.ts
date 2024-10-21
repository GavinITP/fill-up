'use server'
export async function createReport(name: string, description: string) {
    const response = await fetch('http://localhost:8080/reportservice/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description
        })
    })
    if (!response.ok) {
        return false
    }
    return true
}