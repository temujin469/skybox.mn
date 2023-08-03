import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

const SiteFeatures = () => (
    <div className="ps-site-features">
        <div className="ps-container">
            <div className="ps-block--site-features">
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-rocket"></i>
                    </div>
                    <div className="ps-block__right">
                        <Heading>Шуурхай тээвэр</Heading>
                        <Text fontWeight={500}>Хамгийн хурдан</Text>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-sync"></i>
                    </div>
                    <div className="ps-block__right">
                        <Heading>Буцаалт</Heading>
                        <Text fontWeight={500}>бараа асуудалтай бол</Text>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-credit-card"></i>
                    </div>
                    <div className="ps-block__right">
                        <Heading>Эрсдэлгүй сонголт</Heading>
                        <Text fontWeight={500}>найдвартай төлбөр</Text>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-bubbles"></i>
                    </div>
                    <div className="ps-block__right">
                        <Heading>Хямд, хэмнэлттэй</Heading>
                        <Text fontWeight={500}>Зөвхөн манайхаас</Text>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-gift"></i>
                    </div>
                    <div className="ps-block__right">
                        <Heading>Бэлэг дурсгал</Heading>
                        <Text fontWeight={500}>Бэлэг дурсгалын үйлчилгээ</Text>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SiteFeatures;
