import React from 'react';
import Link from 'next/link';
import useBreadCrumb from '~/hooks/useBreadCrumb';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from '@chakra-ui/react';
import { HiOutlineChevronRight } from "react-icons/hi"
type Props = {
    breadcrumb: BreadCrumb[],
    bgColor?: "white" | "gray"
}

const BreadCrumb = ({ breadcrumb, bgColor }: Props) => {

    // const { links, setLinks } = useBreadCrumb();

    // const handleClick = (index: number) => {
    //     setLinks(links?.slice(0, index + 1))
    // }


    return (
        <div className="ps-breadcrumb" style={{
            backgroundColor: bgColor === "white" ? "white" : "#F1F1F1"
        }}>
            <div
                className='ps-container'
            >
                <Breadcrumb  overflow="hidden" textOverflow="ellipsis" spacing='4px'
                //     separator={
                //         <Text color="gray.600">
                //             <HiOutlineChevronRight />
                //         </Text>
                // }
                >
                    <BreadcrumbItem>
                        <Link href="/">
                            <Heading fontWeight={500} fontSize={{base:"13px",md:"14px"}}>
                                Нүүр
                            </Heading>
                        </Link>
                    </BreadcrumbItem>
                    {breadcrumb?.map((item, index) => {
                        return (
                            <BreadcrumbItem whiteSpace="nowrap" key={item.text}>
                                <Link href={item.url ? item.url : "#"}>
                                    <Heading fontWeight={500} fontSize={{ base: "13px", md: "14px" }}>
                                        {item.text}
                                    </Heading>
                                </Link>
                            </BreadcrumbItem>
                        );
                    })}
                </Breadcrumb>
            </div>
        </div>
    );
};

export default BreadCrumb;
