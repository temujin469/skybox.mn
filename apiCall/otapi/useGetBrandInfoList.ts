import { AxiosResponse } from "axios";
import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

interface Response extends OtapiResponse {
  BrandInfoList: {
    Content:BrandInfoContent[]
  };
}


const useGetBrandInfoList = createQuery<Response | undefined>({
  primaryKey: "/GetBrandInfoList",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    try {
      const res: AxiosResponse<Response> = await otApi.get(
        `${primaryKey}?instanceKey=${key}`
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

export default useGetBrandInfoList;
