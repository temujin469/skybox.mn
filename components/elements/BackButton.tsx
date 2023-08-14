import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

type Props = {
  url?:string,
  children?:any
}

function BackButton({url,children}:Props) {
  return (
    <Link href={url ? url : "#"}>
      <Button variant="ghost" className='text-end'>
        <p>
          <i className="icon-arrow-left mr-2"></i>
          {children ? children : "Буцах"}
        </p>
      </Button>
    </Link>
  );
}

export default BackButton;
