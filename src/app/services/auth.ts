import api from "./api";

// Function untuk Register dengan First Name & Last Name
export async function registerUser(firstName: string, lastName: string, username: string, email: string, password: string) {
  const fullName = `${firstName} ${lastName}`.trim(); // Gabungkan firstName & lastName

  try {
    const response = await api.post("/auth/register", { 
      fullname: fullName, 
      username, 
      email, 
      password 
    });

    return response.data; // Mengembalikan response dari server
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to register");
  }
}

// Function untuk Login
export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Biasanya API akan mengembalikan token
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login Failed");
  }
}
