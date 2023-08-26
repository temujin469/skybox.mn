import { createQuery } from "react-query-kit";
import xmljs from "xml2js";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  Result?: {
    Content?: {
      Id: string;
      UserId: {
        Value: string;
      };
      UserName:string
      OriginalText: string;
      Text: string;
      CreatedTime?: string;
      ImageUrls?: string[];
      ImagePreviewUrls?: string[];
      Rating: number;
      Videos?: {
        PreviewUrl?: string;
        Url?: string;
      }[];
    }[];
    TotalCount: number;
  };
};

type Variables = {
  productId: string;
  source:"Internal" | "Provider";
  start: number;
  limit: number;
};

const useSearchItemReviews = createQuery<Response, Variables>({
  primaryKey: "/SearchItemReviews",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    const builder = new xmljs.Builder();

    const xml = builder.buildObject({
      SearchParameters: {
        ItemId: variables.productId,
        Source: variables.source,
      },
    });

    try {
      const uri = `https://otapi.net/service-json${primaryKey}?instanceKey=${key}&xmlSearchParameters=${xml}&framePosition=${variables.start}&frameSize=${variables.limit}`;
      const encoded = encodeURI(uri);
      const res = await fetch(encoded);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },
});

export default useSearchItemReviews;
