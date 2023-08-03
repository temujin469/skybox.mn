import { AxiosResponse } from "axios";
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
  collaction: "discounted" | "suggest";
};

const useGetProductCollectoin = createQuery<Response, Variables>({
  primaryKey: "/FindCategoryItemSimpleInfoListFrame",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      let res:any
      if(variables.collaction === "discounted"){
        return res = await otApi.get(
          `${primaryKey}?instanceKey=${key}&categoryItemFilter=&framePosition=${variables.start}&frameSize=${variables.limit}`
        );
      }else if (variables.collaction === "suggest"){
        return res = await otApi.get(
          `${primaryKey}?instanceKey=${key}&categoryItemFilter=&framePosition=${variables.start}&frameSize=${variables.limit}`
        );
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useGetProductCollectoin;
