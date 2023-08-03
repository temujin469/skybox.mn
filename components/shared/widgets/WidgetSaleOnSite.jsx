import React from 'react';
import Link from 'next/link';

const WidgetSaleOnSite = () => {
    return (
        <aside className="widget widget_sell-on-site">
            <p>
                <i className="icon-store"></i> Sell on Martfury?
                <Link href="/account/register">
                    <p> Register Now !</p>
                </Link>
            </p>
        </aside>
    );
};

export default WidgetSaleOnSite;
