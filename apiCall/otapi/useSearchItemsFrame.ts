import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";
import xmljs from "xml2js"

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  OtapiItemInfoSubList: {
    Content: ProductInfo[];
    TotalCount: number;
  };
};

type Variables = {
  filters?: Partial<ProductFilter>;
  start: number;
  limit: number;
};

const useSearchItemsFrame = createQuery<Response, Variables>({
  primaryKey: "/SearchItemsFrame",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const xmlstring: string = `
     <SearchItemsParameters>
   <ItemTitle>a</ItemTitle>
  </SearchItemsParameters>
    `;

    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&xmlParameters=${xmlstring}&framePosition=${variables.start}&frameSize=${variables.limit}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useSearchItemsFrame;
