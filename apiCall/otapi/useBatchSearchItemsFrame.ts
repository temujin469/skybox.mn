import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";
import xmljs from "xml2js";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  Result: {
    Items: {
      Items: {
        Content: ProductInfo[];
        TotalCount: number;
      };
      CurrentFrameSize: number;
      MaximumPageCount:number
    };
    SearchProperties: {
      Content:SearchPropertyContent[]
    };
  };
};

type Variables = {
  filters?: Partial<ProductFilter>;
  start: number;
  limit: number;
};

const useBatchSearchItemsFrame = createQuery<Response, Variables>({
  primaryKey: "/BatchSearchItemsFrame",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
     const builder = new xmljs.Builder();
     const filters = variables.filters;

     const xml = builder.buildObject({
       SearchItemsParameters: {
         MinPrice: filters?.MinPrice || undefined,
         MaxPrice: filters?.MaxPrice || undefined,
         CategoryId: filters?.CategoryId || undefined,
         BrandId: filters?.BrandId || undefined,
         OrderBy: filters?.OrderBy || undefined,
         VendorId:filters?.VendorId || undefined,
         ItemTitle: filters?.ItemTitle || undefined,
         Configurators: filters?.Configurators || undefined
       },
     });


//     const xmlstring: string = `
//     <SearchItemsParameters>
//   <CategoryId>otc-4</CategoryId>
// </SearchItemsParameters>
//     `;

    try {
      // const res = await otApi.get(
      //   `${primaryKey}?instanceKey=${key}&xmlParameters=${xmlstring}&framePosition=${variables.start}&frameSize=${variables.limit}`
      // );
      // const res = await otApi.get(
      //   "https://otapi.net/service-json/BatchSearchItemsFrame?instanceKey=cec9d556-50d2-4b8f-a3a2-7a9dfac01dd0&xmlParameters=%3CSearchItemsParameters%3E%20%20%3CCategoryId%3Eotc-4%3C/CategoryId%3E%3C/SearchItemsParameters%3E&framePosition=0&frameSize=2&blockList=Brand",
      // );
      // return res.data;
      // const uri =
      //   "http://otapi.net/service-json/BatchSearchItemsFrame?instanceKey=cec9d556-50d2-4b8f-a3a2-7a9dfac01dd0&xmlParameters=<SearchItemsParameters>\n  <CategoryId>otc-4</CategoryId>\n</SearchItemsParameters>&framePosition=0&frameSize=2&blockList=Brand";

      const uri = `https://otapi.net/service-json${primaryKey}?instanceKey=${key}&xmlParameters=${xml}&framePosition=${variables.start}&frameSize=${variables.limit}&blockList=SearchProperties`;
      const encoded = encodeURI(uri);
      console.log("ecn", encoded);
      const res = await fetch(encoded);
      //otapi.net/service-json/BatchSearchItemsFrame?instanceKey=cec9d556-50d2-4b8f-a3a2-7a9dfac01dd0&xmlParameters=%3C?xml%20version=%221.0%22?%3E%3CSearchItemsParameters%3E%20%20%3CCategoryId%3Eotc-4%3C/CategoryId%3E%3C/SearchItemsParameters%3E%20%20%20%20&framePosition=0&frameSize=60&blockList=Brand
      // const res = await fetch(
      //   "https://otapi.net/service-json/BatchSearchItemsFrame?instanceKey=cec9d556-50d2-4b8f-a3a2-7a9dfac01dd0&xmlParameters=%3CSearchItemsParameters%3E%20%20%3CCategoryId%3Eotc-4%3C/CategoryId%3E%3C/SearchItemsParameters%3E&framePosition=0&frameSize=2&blockList=Brand"
      // );
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useBatchSearchItemsFrame;
