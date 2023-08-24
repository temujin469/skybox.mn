import { createQuery } from "react-query-kit";
import { otApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
    VendorInfo: {
        Id:string;
        ProviderType:string,
        Name:string,
        DisplayName:string
        ShopName:string;
        PictureUrl:string;
        DisplayPictureUrl?:string;
        Location?:{
            State?:string
            City?:string
        }
        Credit?:{
            Level?:number
        }
        Scores:{
            DeliveryScore?:number;
            ItemScore?:number
            ServiceScore?:number
        }
  };
};

type Variables = {
  vendorId:string
}

const useGetVendorInfo = createQuery<Response, Variables>({
  primaryKey: "/GetVendorInfo",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const res = await otApi.get(
        `${primaryKey}?instanceKey=${key}&vendorId=${variables.vendorId}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useGetVendorInfo
