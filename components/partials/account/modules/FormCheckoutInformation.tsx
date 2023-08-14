import { Box, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from "zod"
import useUserInfo from '~/apiCall/strapi/useUserInfo';
import { setContactInfo } from '~/store/ecomerce/ecomerceSlice';
import { AppDispatch, RootState } from '~/store/store';
import { strapiApi } from '~/utilities/axios';

const infoSchema = z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    phoneNumber: z.string().max(8).min(8).nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    address: z.string().nonempty(),
});


type ValidationSchema = z.infer<typeof infoSchema>;

function FormCheckoutInformation() {

    const [error, setError] = useState(false);

    const { token } = useSelector((state: RootState) => state.auth);

    const { data: user, isLoading } = useUserInfo({ variables: { jwt: token! } });
    const contact_information = user?.contact_information

    const [isSave, setIsSave] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        defaultValues: {
            firstname: contact_information?.firstname,
            lastname: contact_information?.lastname,
            phoneNumber: contact_information?.phoneNumber,
            address: contact_information?.address,
            city: contact_information?.city,
            state: contact_information?.state
        },
        resolver: zodResolver(infoSchema),
    })

    const [api, contextHolder] = notification.useNotification();

    const queryClient = useQueryClient()

    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()


    const saveInfoMutation = useMutation({
        mutationFn: async (info: ValidationSchema) => {
            const res = await strapiApi.put(`/users/${user?.id}`, { contact_information: info }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        },
        onSuccess: () => {
            api.success({
                message: "Амжилттай хадгаллаа"
            })
            queryClient.invalidateQueries(useUserInfo.getKey())
        },
        onError: () => {
            api.error({
                message: "Алдаа гарлаа",
            });
        }
    })

    const handleSubmitContactInfo = (info: ValidationSchema) => {
        if (!error) {
            dispatch(setContactInfo(info))
            if (isSave) {
                saveInfoMutation.mutate(info)
                return router.push("/account/shipping");
            }
            router.push("/account/shipping")
        }

    }
    return (
        <form
            className="ps-form__billing-info"
            autoComplete="off"
            onSubmit={handleSubmit(handleSubmitContactInfo)}>
            {contextHolder}
            {/* <h3 className="ps-form__heading">Хувийн мэдээлэл</h3> */}
            {
                !isLoading && contact_information ? (
                    <>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>
                                        Овог <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-control"
                                        defaultValue={contact_information.lastname}
                                        {...register("lastname",)}
                                    />
                                    <p>{errors?.lastname?.message}</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>
                                        Нэр <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-control"
                                        defaultValue={contact_information.firstname}
                                        {...register("firstname",)}
                                    />
                                    <p>{errors?.firstname?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>
                                        Утасны дугаар <sup>*</sup>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder=""
                                        className="form-control"
                                        defaultValue={contact_information.phoneNumber}
                                        {...register("phoneNumber")}
                                    />
                                    <p>{errors?.phoneNumber?.message}</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>
                                        Хот / аймаг <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-control"
                                        defaultValue={contact_information.city}
                                        {...register("city",)}
                                    />
                                    <p>{errors?.city?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                Дүүрэг / сум <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                defaultValue={contact_information.state}
                                {...register("state",)}
                            />
                            <p>{errors?.state?.message}</p>
                        </div>
                        <div className="form-group">
                            <label>
                                Хаяг <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                defaultValue={contact_information.address}
                                {...register("address")}
                            />
                            <p>{errors?.address?.message}</p>
                        </div>
                        <div className="form-group">
                            <div className="ps-checkbox">
                                <input
                                    className="form-control"
                                    type="checkbox"
                                    id="save-information"
                                    checked={isSave}
                                    onChange={() => setIsSave(!isSave)}
                                />
                                <label htmlFor="save-information">
                                    Дараагийн удаад энэ мэдээллийг хадгалах
                                </label>
                            </div>
                        </div>
                    </>
                ) : isLoading ?  (
                    <div>
                        Хайж байна
                    </div>
                ) : (
                            <>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>
                                                Овог <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder=""
                                                className="form-control"
                                                {...register("lastname",)}
                                            />
                                            <p>{errors?.lastname?.message}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>
                                                Нэр <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder=""
                                                className="form-control"
                                                {...register("firstname",)}
                                            />
                                            <p>{errors?.firstname?.message}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>
                                                Утасны дугаар <sup>*</sup>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder=""
                                                className="form-control"
                                                {...register("phoneNumber")}
                                            />
                                            <p>{errors?.phoneNumber?.message}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>
                                                Хот / аймаг <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder=""
                                                className="form-control"
                                                {...register("city",)}
                                            />
                                            <p>{errors?.city?.message}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Дүүрэг / сум <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-control"
                                        {...register("state",)}
                                    />
                                    <p>{errors?.state?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Хаяг <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-control"
                                        {...register("address")}
                                    />
                                    <p>{errors?.address?.message}</p>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="save-information"
                                            checked={isSave}
                                            onChange={() => setIsSave(!isSave)}
                                        />
                                        <label htmlFor="save-information">
                                            Дараагийн удаад энэ мэдээллийг хадгалах
                                        </label>
                                    </div>
                                </div>
                            </>
                )
            }
            <Box display="flex" justifyContent={"space-between"} alignItems={'center'}>
                <Link href="/account/shopping-cart">
                    <p>
                        <i className="icon-arrow-left mr-2"></i>
                        Сагс руу буцах
                    </p>
                </Link>
                <Button variant="brand" size="lg" type='submit'>
                    үргэлжлүүлэх
                </Button>
            </Box>
        </form>
    );
}

export default FormCheckoutInformation;
