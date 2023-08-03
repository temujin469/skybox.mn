import React from 'react';
import Link from 'next/link';

const DemoItem = ({ data }) => (
    <div className="ps-block--demo">
        <div className="ps-block__thumbnail">
            <Link href={data.link} key={data.text}>
                <p>
                    <img src={data.image} alt={data.text} />
                </p>
            </Link>
        </div>

        <div className="ps-block__content">
            <Link href={data.link}>
                <p className="ps-block__title">{data.text}</p>
            </Link>
        </div>
    </div>
);

export default DemoItem;
