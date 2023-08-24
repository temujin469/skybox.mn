import { Heading } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'
import { MdOutlineShoppingBag} from 'react-icons/md';
import { LuHeartHandshake } from 'react-icons/lu';
import { TbMapPin, TbTruckDelivery } from 'react-icons/tb';
import useGetVendorInfo from '~/apiCall/otapi/useGetVendorInfo';
import useAppState from '~/hooks/useAppState'

function WidgetVendor() {
    const {vendorId}= useAppState();
    const {data,isLoading} = useGetVendorInfo({variables:{vendorId:vendorId!}});
    const vendorInfo = data?.VendorInfo;

  return (
    <div>
        {
            vendorInfo && !isLoading ? (
                <div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='aspect-[1/1] relative w-full max-w-[30%] border rounded-full'>
                    <Image fill className='rounded-full p-[10px]' src={vendorInfo?.DisplayPictureUrl ? vendorInfo.DisplayPictureUrl : "https://www.berchielli.co.uk/wp-content/themes/barberry/images/placeholder.jpg"} alt={vendorInfo?.Name}/>
                    </div>
                    <div>
                    <Heading size="sm">{vendorInfo.DisplayName}</Heading>
                    {
                        vendorInfo?.Location?.State && (
                            <p className='flex gap-1'><TbMapPin size={20}/>{vendorInfo.Location?.State ?vendorInfo.Location?.State : vendorInfo.Location?.City }</p>
                        )
                    }
                    </div>
                    </div>
                    <div className="flex items-center justify-around mt-[20px]">
                        <div className='flex items-center gap-1'>
                            <TbTruckDelivery size={30}/>
                            <p>{vendorInfo.Scores.DeliveryScore}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <MdOutlineShoppingBag size={30}/>
                            <p>{vendorInfo.Scores.ItemScore}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <LuHeartHandshake size={30}/>
                            <p>{vendorInfo.Scores.ServiceScore}</p>
                        </div>
                    </div>
        </div>
            ) : <div>
            </div>
        }
    </div>
  )
}

export default WidgetVendor