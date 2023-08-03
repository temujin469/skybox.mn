import { strapiApi } from "~/utilities/axios";

// save contact info
const register = async ({
  info,
  token,
  userId,
}: {
  info: User["contact_information"];
  token: string;
  userId: number;
}) => {
  const response = await strapiApi.put<AuthResponse>(`/users/${userId}`, info, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};



const authService = {
  register,
  
};

export default authService;
