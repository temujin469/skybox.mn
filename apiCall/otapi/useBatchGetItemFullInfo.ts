import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

interface Response extends OtapiResponse {
  Result:{
    Item:ProductFullInfo,
    VendorItems:{
      Content:ProductInfo[]
    }
  }
};

type Variables = {
  id: string;
};

const useBatchGetItemFullInfo = createQuery<Response, Variables>({
  primaryKey: "/BatchGetItemFullInfo",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&itemId=${variables.id}&blockList=DeliveryCosts,Promotions`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useBatchGetItemFullInfo;
