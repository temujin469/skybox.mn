import React from 'react';
import Link from 'next/link';

type Props = {
    info:{
        contactInfo:User["contact_information"],
        isShipping:boolean
    }
}

const ModulePaymentShipping = ({info}:Props) => {
    return (
        <>
            <div className="ps-block__panel">
                <figure>
                    <p>Хувийн мэдээлэл: </p>
                    <strong> {info.contactInfo?.firstname} {info.contactInfo?.lastname}</strong>
                </figure>
                <figure>
                    <p>Хаяг: </p>
                    <strong>
                        {info.contactInfo?.city},
                        {info.contactInfo?.state},
                        {info.contactInfo?.address}
                    </strong>
                </figure>
            </div>
            <div className="ps-block__panel">
                <figure>
                    <p>Ачаа хүлээж авах: </p>
                    <strong>
                        {!info.isShipping ? "Оффисоос ирж авна" : "Гэртээ хүргүүлнэ" }
                    </strong>
                </figure>
            </div>
        </>
    );
};

export default ModulePaymentShipping;
