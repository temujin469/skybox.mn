import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store/store';
import { formatCurrency } from '~/utilities/product-helper';

const ModuleCartSummary = () => {
    // View
    const amount = useSelector((state:RootState) =>state.cart.amount)

    return (
        <>
            <div className="ps-block--shopping-total">
                <h3 className='mb-4'>Захиалгын дүн</h3>
                <div className="ps-block__header">
                    <p>
                        Барааны үнэ: <span> {formatCurrency(amount!)}₮</span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <h4>
                        Нийт: <span>{formatCurrency(amount!)}₮</span>
                    </h4>
                </div>
            </div>
        </>
    );
};

export default ModuleCartSummary;
