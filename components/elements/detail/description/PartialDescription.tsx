import React from 'react';
import useGetItemDescription from '~/apiCall/otapi/useGetItemDescription';
import EmptyState from '../../EmptyState';
import { Skeleton } from '@chakra-ui/react';
import useAppState from '~/hooks/useAppState';

const PartialDescription = () => {

    const {productId}= useAppState()
    const { data, isLoading} = useGetItemDescription({ variables: { id: productId! } })

    return (
        isLoading ? (
            <>
                <Skeleton h="100px" mb={3} />
                <Skeleton h="500px" />
            </>
        ) : data?.OtapiItemDescription ? (
            <div dangerouslySetInnerHTML={{
                __html: data?.OtapiItemDescription.ItemDescription!
            }} />
        ) : (
                <EmptyState text='Мэдээлэл алга байна'/>
        )
    )
}

export default PartialDescription;
