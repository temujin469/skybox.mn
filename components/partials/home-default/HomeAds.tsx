import React from 'react';
import useGetHomeContent from '~/apiCall/strapi/useGetHomeContent';

import Promotion from '~/components/elements/media/Promotion';

const HomeAds = () => {

    const {data} = useGetHomeContent();
  
    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                {/* <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion1 ? promotion1.image : null}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion2 ? promotion2.image : null}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
};
export default HomeAds;
