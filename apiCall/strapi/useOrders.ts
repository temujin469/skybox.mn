import { createQuery } from "react-query-kit";
import { strapiApi } from "~/utilities/axios";

type Response = {
  data: {
    id: number;
    attributes: OrderResponse;
  }[];
  meta:Meta
};

type Variable = {
  jwt: string;
  query:string
};


const useOrders = createQuery<Response, Variable>({
  primaryKey: "/orders",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await strapiApi.get(
        `${primaryKey}?${variables.query}`,
        {
          headers: {
            Authorization: `Bearer ${variables.jwt}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useOrders
