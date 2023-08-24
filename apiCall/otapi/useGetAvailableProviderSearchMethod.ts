import { AxiosResponse } from "axios";
import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";
import xmljs from "xml2js";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

interface Response extends OtapiResponse {
  Result: {
    Content: AvailableProviderSearchMethod[];
  };
}

type Variables = {
  filters?: Partial<ProductFilter>;
};

const useGetAvailableProviderSearchMethod = createQuery<
  Response | undefined,
  Variables
>({
  primaryKey: "/GetAvailableProviderSearchMethodInfoListForSearchParameters",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const builder = new xmljs.Builder();
      const filters = variables.filters;

      const xml = builder.buildObject({
        SearchItemsParameters: {
          MinPrice: filters?.MinPrice || undefined,
          MaxPrice: filters?.MaxPrice || undefined,
          CategoryId: filters?.CategoryId || undefined,
          BrandId: filters?.BrandId || undefined,
          OrderBy: filters?.OrderBy || undefined,
          ItemTitle: filters?.ItemTitle || undefined,
        },
      });

      const uri = `${primaryKey}?instanceKey=${key}&xmlSearchParameters=${xml}`;
      const encoded = encodeURI(uri);

      const res: AxiosResponse<Response> = await otApi.get(encoded);

      if (res.data.ErrorCode != "Ok") {
        throw new Error(res.data.ErrorDescription);
      }

      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useGetAvailableProviderSearchMethod;
