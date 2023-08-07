import Image from 'next/image';
import React, { useState } from 'react';
import { getPlaceholderImageURL } from '~/utilities/getPlaceHolderImageUrl';
import cn from 'clsx';


type Props = {
  className?: string;
  alt?:string;
  src:string;
  style?: React.CSSProperties
  sizes?:string
  fill?:boolean
  width?:number
  height?:number
  blurDataURL?:string
}

function BlurImage(props:Props) {

  const [isLoading, setLoading] = useState(true);

  return (
    <Image src={props.src}
      style={props.style || {
        borderRadius:"5px",
        objectFit: "cover",
      }}
      alt={props.alt || "any image"}
      fill={props.fill}
      loading='lazy'
      sizes={props.sizes}
      width={props.width}
      height={props.height}
      placeholder="blur"
      className={cn(
        props.className,
        'duration-700 ease-in-out',
        isLoading
          ? 'blur-sm'
          : 'blur-0'
      )}
      onLoadingComplete={() => setLoading(false)}
      blurDataURL={getPlaceholderImageURL(props.src) || props.blurDataURL }
    />

  );
}

export default BlurImage;
