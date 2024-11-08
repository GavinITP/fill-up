export const adminService = {
  loginAdmin: async (adminEmail: string, adminPassword: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return await response.json();
  },
};
