import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { TbMapPin, TbTruckDelivery } from "react-icons/tb";
import useGetVendorInfo from "~/apiCall/otapi/useGetVendorInfo";
import useAppState from "~/hooks/useAppState";
import Link from "next/link";
import { Rate } from "antd";

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
              <div className="aspect-[1/1] relative w-full max-w-[100px] border rounded-[5px]">
                <Image
                  fill
                  className="rounded-[5px]"
                  src={
                    vendorInfo?.DisplayPictureUrl
                      ? vendorInfo.DisplayPictureUrl
                      : "https://www.berchielli.co.uk/wp-content/themes/barberry/images/placeholder.jpg"
                  }
                  alt={vendorInfo?.Name}
                />
              </div>

              <div className="flex-[1]">
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
                <Rate disabled value={vendorInfo.Scores?.ServiceScore} className="mb-0" />

              </div>

            </div>

          </Link>

          <div className="flex items-center justify-between mt-[20px] text-gray-600">
            <div className="flex items-center gap-1 ">
              <TbTruckDelivery size={25} />
              <p className="font-[600] text-[16px] text-gray-600">{vendorInfo.Scores?.DeliveryScore || 0}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineShoppingBag size={25} />
              <p className="font-[600] text-[16px] text-gray-600">{vendorInfo.Scores?.ItemScore || 0}</p>
            </div>
            <div className="flex items-center gap-1">
              <LuHeartHandshake size={25} />
              <p className="font-[600] text-[16px] text-gray-600">{vendorInfo.Scores?.ServiceScore || 0}</p>
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
