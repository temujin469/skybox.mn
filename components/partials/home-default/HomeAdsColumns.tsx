import React from 'react';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';

import Promotion from '~/components/elements/media/Promotion';

const HomeAdsColumns = () => {
    const { data } = useGetHomeContent();

    const promotions = data?.data.attributes.promotion_section.promotions;

    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    {
                        promotions?.map((promotion) =>(
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <Promotion
                                    link={promotion.link || "#"}
                                    image={promotion ? promotion.image.data.attributes: undefined}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeAdsColumns;
