import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterCopyright from './modules/FooterCopyright';

const FooterFullwidth = () => (
    <footer className="ps-footer border-t">
        <div className="ps-container">
            <FooterWidgets />
            <FooterCopyright />
        </div>
    </footer>
);

export default FooterFullwidth;
