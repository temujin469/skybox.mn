import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  OtapiItemInfoSubList: {
    Content: ProductInfo[];
    TotalCount: number;
  };
};

type Variables = {
  start: number;
  limit: number;
};

const GetBrandInfoListFrame = createQuery<Response, Variables>({
  primaryKey: "/GetBrandInfoListFrame",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&framePosition=${variables.start}&frameSize=${variables.limit}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default GetBrandInfoListFrame;
