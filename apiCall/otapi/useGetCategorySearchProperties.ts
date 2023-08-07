import { AxiosResponse } from "axios";
import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

interface Response extends OtapiResponse {
  CategoryInfoList: {
    Content:CategorySearchPropertyInfoContent[]
  }
}

type Variables = {
  catId?: string;
};

const useGetCategorySearchProperties = createQuery<
  Response | undefined,
  Variables
>({
  primaryKey: "/GetCategorySearchProperties",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      if (!variables.catId) {
        return;
      }
      const res: AxiosResponse<Response> = await otApi.get(
        `${primaryKey}?instanceKey=${key}&CategoryId=${variables.catId}`
      );

      if (res.data.ErrorCode != "Ok") {
        throw new Error(res.data.ErrorDescription);
      }

      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useGetCategorySearchProperties;
