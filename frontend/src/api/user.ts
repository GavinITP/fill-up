export const userService = {
  loginUser: async (userEmail: string, userPassword: string) => {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return await response.json();
  },

  registerUser: async (
    userName: string,
    userEmail: string,
    userPassword: string,
  ) => {
    const response = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return await response.json();
  },

  registerOwner: async (
    ownerId: string,
    identityCardNumber: string,
    telephoneNumber: string,
  ) => {
    const response = await fetch("http://localhost:8080/user/register/owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: ownerId,
        identityCardNumber: identityCardNumber,
        telephoneNumber: telephoneNumber,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return await response.json();
  },
};
