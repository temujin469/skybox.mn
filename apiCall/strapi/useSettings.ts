import { createQuery } from "react-query-kit";
import { strapiApi } from "~/utilities/axios";

type Response = {
  data: {
    id: number;
    attributes: Setttings
  };
};



const useSettings = createQuery<Response>({
  primaryKey: "/settings",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    try {
      const res = await strapiApi.get(`${primaryKey}`);
      // return res.json();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useSettings;
