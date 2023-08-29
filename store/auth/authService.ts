import { strapiApi } from "~/utilities/axios";



  const signinWithProvider = async ({token,provider}:{token:string,provider:"google"|"facebook" | string}) => {
    const response = await strapiApi.get(
      `/auth/${provider}/callback?access_token=${token}`
    );
    console.log(provider,token);
     if (response.data) {
       localStorage.setItem("user", JSON.stringify(response.data));
     }

     return response.data;
  };



// Register user
const register = async (userData:UserBody) => {
  const response = await strapiApi.post<AuthResponse>("/auth/local/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData: UserBody) => {
  const response = await strapiApi.post<AuthResponse>("/auth/local", {
    identifier: userData.email,
    password: userData.password,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  signinWithProvider
};

export default authService;
