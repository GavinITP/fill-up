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
};
