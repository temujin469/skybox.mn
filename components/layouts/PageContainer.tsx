import React from 'react';
import Head from 'next/head';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import FooterDefault from '../shared/footers/FooterDefault';
import { Box } from '@chakra-ui/react';

const initHeaders = (
    <>
        <HeaderDefault />
        <HeaderMobile />
    </>
);
const initFooters = (
    <>
        <FooterDefault/>
    </>
);

type Props = {
    header?: React.ReactNode
    footer?: React.ReactNode
    children:React.ReactNode
    title?:string
    bgColor?:string
}

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    bgColor,
    title = 'Page',
}:Props) => {
    let titleView;

    if (title !== '') {
        titleView = "skybox" + ' | ' + title;
    } else {
        titleView = "skybox"
    }

    return (
        <Box pb={["80px","80px",0]} bg={bgColor ? bgColor : "white"}>
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            {children}
            {footer}
        </Box>
    );
};

export default PageContainer;
