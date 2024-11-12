export const adminService = {
    getOwnerRequests: async (token: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/owner/requests`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (!response.ok) {
            throw new Error("Failed to get owner requests");
        }
        return await response.json();
    },

    sendOwnerVerification: async (
        token: string,
        ownerId: string,
        isApproved: boolean,
    ) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/owner/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ownerId: ownerId,
                    isApproved: isApproved
                }),
            },
        );
        if (!response.ok) {
            throw new Error("Failed to verify owner");
        }
        return await response.json();
    },

    getOwnerEmailAndName: async (token: string, ownerId: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/info/${ownerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (!response.ok) {
            throw new Error("Failed to get owner email and name");
        }
        return await response.json();
    },

    getReports: async (token: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/report-service/reports`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (!response.ok) {
            throw new Error("Failed to get reports");
        }
        return await response.json();
    },

    markReport: async (token: string, reportId: string, completed: boolean) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/report-service/report/${reportId}/complete`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    completed: completed
                }),
            },
        );
        if (!response.ok) {
            throw new Error("Failed to mark report");
        }
        return await response.json();
    },

    sendAdminNote: async (token: string, stationId: string, note: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${stationId}/update-note`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    note: note
                }),
            },
        );
        if (!response.ok) {
            throw new Error("Failed to send comment");
        }
        return await response.json();
    }
};
