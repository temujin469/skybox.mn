import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa';

const WidgetShopFilterByPriceRange = () => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    function handleRouter() {
        const oldQuery = Router.query;
        let query;

        if(max == 0){
            query = {
                ...oldQuery,
                min:min,
                max:undefined
            }
        }else if (min == 0) {
            query = {
                ...oldQuery,
                min:undefined,
                max: max
            }
        }else {
            query = {
                ...oldQuery,
                min: min,
                max: max
            }
        }

       

        const newQuery = Object.entries(query).map(item=>{
            return `${item[0]}=${item[1]}`;
        })
            Router.push(`/shop?${newQuery.join("&")}`);
    }

    useEffect(()=>{
            handleRouter()
    },[min,max])

    return (
        <aside className="rounded-md bg-white p-[20px] mb-[20px]">
            <div>
                <Heading size="md" className='mb-3'>Үнэ</Heading>
                {/* <Slider
                    range
                    defaultValue={[0, 2000]}
                    max={2000}
                    onAfterChange={(e) => handleChangeRange(e)}
                /> */}
                <p>Багадаа</p>
                <Slider max={1000000} aria-label='slider-ex-4' defaultValue={0} onChange={(value)=>setMin(value)}>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='brand.1' />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Heading color="brand.1">
                            ₮
                        </Heading>
                    </SliderThumb>
                </Slider>
                <p>Ихдээ</p>

                <Slider max={10000000} defaultValue={0} aria-label='slider-ex-4' onChange={(value) => setMax(value)}>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='brand.1' />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        {/* <Box color='tomato' as={FaDollarSign} /> */}
                        <Heading color="brand.1">
                            ₮
                        </Heading>
                    </SliderThumb>
                </Slider>
                {/* <Input className='mb-3' type='number' placeholder='Багадаа' />
                <Input className='mb-3' type='number' placeholder='Ихдээ' /> */}
                <p>
                    Үнэ: {min}₮ - {max !== 0 ? ` ${max}₮` : "Бүгд"}
                </p>
            </div>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
