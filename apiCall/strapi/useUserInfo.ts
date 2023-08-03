import QueryString from "qs";
import { createQuery } from "react-query-kit";
import { strapiApi } from "~/utilities/axios";

type Response = User;

type Variable = {
  jwt: string;
};


const query = QueryString.stringify(
  {
    populate: "contact_information",
  },
  { encodeValuesOnly: true }
);

const useUserInfo = createQuery<Response,Variable>({
  primaryKey: "/users/me",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await strapiApi.get(`${primaryKey}?${query}`,{
        headers:{
          "Authorization": `Bearer ${variables.jwt}`
        }
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useUserInfo;
