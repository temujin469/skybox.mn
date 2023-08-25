import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { TbMapPin, TbTruckDelivery } from "react-icons/tb";
import useGetVendorInfo from "~/apiCall/otapi/useGetVendorInfo";
import useAppState from "~/hooks/useAppState";
import Link from "next/link";

function VendorView() {
  const { vendorId } = useAppState();
  const { data, isLoading } = useGetVendorInfo({
    variables: { vendorId: vendorId! },
  });
  const vendorInfo = data?.VendorInfo;

  return (
    <div>
      {vendorInfo && !isLoading ? (
        <div>
          <Link href={`/shop?vendorId=${vendorId}`}>
            <div className="flex gap-[10px] items-center">
              <div className="aspect-[1/1] relative w-full max-w-[30%] border rounded-full">
                <Image
                  fill
                  className="rounded-full p-[10px]"
                  src={
                    vendorInfo?.DisplayPictureUrl
                      ? vendorInfo.DisplayPictureUrl
                      : "https://www.berchielli.co.uk/wp-content/themes/barberry/images/placeholder.jpg"
                  }
                  alt={vendorInfo?.Name}
                />
              </div>

              <div>
                <Link href={`/shop?vendorId=${vendorId}`} >
                  <Heading size="sm">{vendorInfo.DisplayName}</Heading>
                </Link>
                {vendorInfo?.Location?.State && (
                  <Heading fontSize="14px" className="flex gap-1 items-center mt-[5px]">
                    <TbMapPin size={20} />
                    {vendorInfo.Location?.State
                      ? vendorInfo.Location?.State
                      : vendorInfo.Location?.City}
                  </Heading>
                )}
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-around mt-[20px] text-gray-600">
            <div className="flex items-center gap-1 ">
              <TbTruckDelivery size={25} />
              <p className="font-[600] text-[16px] text-gray-600">{vendorInfo.Scores?.DeliveryScore}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineShoppingBag size={25} />
              <p className="font-[600] text-[16px] text-gray-600">{vendorInfo.Scores?.ItemScore}</p>
            </div>
            <div className="flex items-center gap-1">
              <LuHeartHandshake size={25} />
              <p className="font-[600] text-[16px] text-gray-600">{vendorInfo.Scores?.ServiceScore}</p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default VendorView;
