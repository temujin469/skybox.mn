import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  OtapiItemInfoList: {
    Content: ProductInfo[];
  };
};

type Variables = {
  ids: string[];
};

const useGetItemInfoList = createQuery<Response, Variables>({
  primaryKey: "/GetItemInfoList",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&idsList=${variables.ids
          .join(";")
          .replace(/\s/g, "")}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useGetItemInfoList;
