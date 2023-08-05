import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  OtapiItemDescription: {
    ItemDescription:string
  };
};

type Variables = {
  id: string;
};

const useGetItemDescription = createQuery<Response, Variables>({
  primaryKey: "/GetItemDescription",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&itemId=${variables.id}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useGetItemDescription;
