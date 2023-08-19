import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

interface Item extends ProductFullInfo {
  Properties: {
    Id: string;
    DisplayName: string;
    Value: {
      Id: string;
      DisplayName: string;
    }[];
  }[];
}

type Response = {
  Result?: {
    Item: Item
  };
};

type Variables = {
  id: string;
};

const useBatchGetSimplifiedItemFullInfo = createQuery<Response, Variables>({
  primaryKey: "/BatchGetSimplifiedItemFullInfo",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&itemId=${variables.id}&blockList=`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useBatchGetSimplifiedItemFullInfo;
