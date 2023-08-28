import React from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { otApi } from '~/utilities/axios';
import BlurImage from '~/components/elements/BlurImage';

const WidgetShopBrands = () => {
    const router = useRouter();
    const { brandId } = router.query;
    const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;
    const {data,isLoading} = useQuery({
        queryKey: ["/GetBrandInfo",brandId],
        queryFn:async()=>{
            const res = await otApi.get(`/GetBrandInfo?brandId=${brandId}&instanceKey=${key}`);
            return res.data;
        }
    });

    console.log(data)

    // async function getCategories() {
    //     setLoading(true);
    //     const responseData = await ProductRepository.getBrands();
    //     if (responseData) {
    //         let brandsGroup = [];
    //         if (responseData.length > 0) {
    //             responseData.forEach((brand) => {
    //                 brandsGroup.push({
    //                     id: brand.id,
    //                     value: brand.slug,
    //                     label: brand.name,
    //                 });
    //             });
    //         }
    //         setBrands(brandsGroup);

    //         setTimeout(
    //             function () {
    //                 setLoading(false);
    //             }.bind(this),
    //             250
    //         );
    //     }
    // }


    // useEffect(() => {
    //     getCategories();
    // }, []);

    // Views
    let brandsView;
    // if (!loading) {
    //     if (brands && brands.length > 0) {
    //         const items = brands.map((item) => (
    //             <li key={item.id}>
    //                 <Link href={`shop/${item.slug}`}>{item.name}</Link>
    //             </li>
    //         ));
    //         brandsView = <ul className="ps-list--brands">{items}</ul>;
    //     } else {
    //     }
    // } else {
    //     brandsView = <p>Loading...</p>;
    // }
    return (
        <aside className="rounded-md p-[20px] mb-[13px] sm:mb-[20px] bg-white">
            <Heading size="md">Брэнд</Heading>
            <figure>
                {/* <Radio.Group
                    defaultValue={slug}
                    options={brands}
                    onChange={handleSelectBrand}
                /> */}
                <div className='relative aspect-square'>
                    <BlurImage src={data?.BrandInfo?.PictureUrl} alt={data?.BrandInfo?.Name} fill />
                </div>
            </figure>
        </aside>
    );
};

export default WidgetShopBrands;
