import React from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';

const Logo = ({ type }:any) => {
    let data;
    if (type === 'autopart') {
        data = {
            url: '/home/autopart',
            img: 'img/logo-autopart.png',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/logo-technology.png',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/logo-technology.png',
        };
    }
    else if (type === 'electronic') {
        data = {
            url: '/home/electronic',
            img: 'static/img/logo-electronic.png',
        };
    }
    else if (type === 'furniture') {
        data = {
            url: '/home/furniture',
            img: 'static/img/logo-furniture.png',
        };
    }
    else if (type === 'organic') {
        data = {
            url: '/home/organic',
            img: 'static/img/logo-organic.png',
        };
    }
    else {
        data = {
            url: '/',
            img: '/static/img/logo_light.png',
        };
    }
    return (
        <Link href={data.url}>
            <div className="ps-logo" style={{
                width:"160px",
                position:"absolute",
                left:"0",
                top:"50%",
                transform:"translateY(-50%)",
            }}>
                <img src={data.img} alt="" />
                <Text sx={{
                    whiteSpace:"nowrap",
                    fontSize:"12px",
                    color:"gray.700"
                }}>Шуурхай Найдвартай Хямд</Text>
            </div>
        </Link>
    );
};

export default Logo;
