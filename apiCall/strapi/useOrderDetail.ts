import QueryString from "qs";
import { createQuery } from "react-query-kit";
import { strapiApi } from "~/utilities/axios";


type Response = {
  data: {
    id: number;
    attributes: OrderResponse;
  }[];
};

type Variable = {
  jwt: string;
  orderId:string;
};

const query = QueryString.stringify(
  {
    populate: ["contact_information", "products"],
  },
  { encodeValuesOnly: true }
);

const useOrderDetail = createQuery<Response, Variable>({
  primaryKey: "/orders",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await strapiApi.get(
        `${primaryKey}?filters[order_id][$eq]=${variables.orderId}&${query}`,
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

export default useOrderDetail;
