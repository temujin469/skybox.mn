import React, { useEffect } from 'react';
// import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductHasVariants from '~/components/elements/detail/modules/ModuleProductHasVariants';
import useAppState from '~/hooks/useAppState';
// import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
// import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
// import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
// import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
// import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
// import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';

const ProductDetailVariants = ({ product }:{product:ProductFullInfo}) => {
    // console.log({ product });
    const {setProductId} = useAppState()

    useEffect(()=>{
        setProductId(product.Id)
    },[product])
    if (product) {
            return (
                <div className="ps-product--detail ps-product--fullwidth">
                    <ModuleProductHasVariants product={product} />
                    <DefaultDescription />
                </div>
            );
    } else {
        return <p>Өгөгдөл алга</p>;
    }
};

export default ProductDetailVariants;
