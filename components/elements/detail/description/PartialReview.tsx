import { Avatar, Divider } from "@chakra-ui/react";
import { Image as AntdImage, Rate } from "antd";
import moment from "moment";
import React, { useState } from "react";
import useSearchItemReviews from "~/apiCall/otapi/useSearchItemReviews";
import useAppState from "~/hooks/useAppState";
import Image  from "next/image"

const PartialReview = () => {
  const { productId } = useAppState()
  const { data, isLoading } = useSearchItemReviews({ variables: { productId: productId!, source: "Provider", limit:4, start: 0 } });
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const reviews = data?.Result?.Content;

  console.log(data)

  if(!reviews?.length && !isLoading) return <div className="text-center">
    <div className="relative aspect-[4/3] max-w-[400px] mx-auto">
      <Image src="/static/img/products/noReview.webp" alt="noReviews" fill className="object-contain" />
    </div>
    <p className="font-semibold text-gray-400">Сэтгэгдэл байхгүй байна</p>
  </div>

  let lightboxView;

  if (isOpen) {
    lightboxView;
  }

  return (
    <div>
      {
        reviews?.map((review) => (
          <div className="py-[10px]">
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-[10px]">
                <Avatar size="sm" name={review.UserName} src='#' />
                <div>
                  {/* <p>{review.UserName}</p> */}
                  <Rate style={{
                    fontSize: "14px",
                    lineHeight: "14px"
                  }} disabled defaultValue={review.Rating} />
                </div>
              </div>
              <div>
                {moment(review.CreatedTime).format("YYYY-MM-DD")}
              </div>
            </div>
            <p className="pb-[10px]">{review.Text}</p>
            <div className="pb-[10px]">
            {
              review.ImagePreviewUrls?.length ? (
                <div className="grid grid-cols-12 gap-[10px] pb-[10px]">
                    <AntdImage.PreviewGroup  >
                  {
                    review.ImagePreviewUrls.map((imageUrl,i) => (
                      <div className="col-span-3 sm:col-span-2" onClick={()=>{
                        setPhotoIndex(i)
                        return setIsOpen(true)
                      }}>
                        <div className="relative aspect-square w-full rounded-[5px] overflow-hidden">
                          <AntdImage src={imageUrl} alt={review.UserName} className="rounded-[5px] overflow-hidden object-cover aspect-square"/>
                        </div>
                      </div>
                    ))
                  }
                    </AntdImage.PreviewGroup>

                </div>
              ) : null
            }
            </div>
            <Divider borderStyle="dashed" borderColor="gray.400" />
          </div>
        ))
      }
    </div>
  )
};

export default PartialReview;
