import React from 'react';
import Link from 'next/link';
import useBreadCrumb from '~/hooks/useBreadCrumb';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { HiOutlineChevronRight } from "react-icons/hi"
type Props = {
    breadcrumb: BreadCrumb[],
    bgColor?: "white" | "gray"
}

const BreadCrumb = ({ breadcrumb, bgColor }: Props) => {

    const { links, setLinks } = useBreadCrumb();

    const handleClick = (index: number) => {
        setLinks(links?.slice(0, index + 1))
    }


    return (
        <div className="ps-breadcrumb" style={{
            backgroundColor: bgColor === "white" ? "white" : "#F1F1F1"
        }}>
            <div
                className='ps-container'
            >
                <Breadcrumb spacing='3px'
                    separator={
                        <Text color="gray.600">
                            <HiOutlineChevronRight />
                        </Text>
                }
                >
                    <BreadcrumbItem>
                        <Link href="/">
                            Нүүр
                        </Link>
                    </BreadcrumbItem>
                    <li >

                    </li>
                    {breadcrumb?.map((item, index) => {

                        if (!item.url) {
                            return <BreadcrumbItem key={item.text}>
                                    {item.text}
                            </BreadcrumbItem>
                        } else {
                            return (
                                <BreadcrumbItem key={item.text}>
                                        <Link href={item.url} onClick={() => handleClick(index)}>
                                            {item.text}
                                        </Link>
                                </BreadcrumbItem>
                            );
                        }
                    })}
                </Breadcrumb>
            </div>
        </div>
    );
};

export default BreadCrumb;
