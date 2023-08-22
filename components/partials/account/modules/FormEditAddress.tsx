import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as z from "zod"
import useUserInfo from '~/apiCall/strapi/useUserInfo';
import { RootState } from '~/store/store';
import { strapiApi } from '~/utilities/axios';

const infoSchema = z.object({
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  address: z.string().nonempty(),
  phoneNumber: z.string().nonempty()
});

type ValidationSchema = z.infer<typeof infoSchema>;

const  FormEditAddress =()=> {
    const { token } = useSelector((state:RootState) => state.auth);

    const { data:user,isLoading } = useUserInfo({ variables:{jwt:token!}});
  const shippingAddress = user?.contact_information;


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        defaultValues: {
            firstname:shippingAddress?.firstname,
            lastname:shippingAddress?.lastname,
            address:shippingAddress?.address,
            phoneNumber:shippingAddress?.phoneNumber
        },
        resolver: zodResolver(infoSchema),
    })

  const [api, contextHolder] = notification.useNotification();

  const queryClient = useQueryClient()


    const updateMutation = useMutation({
      mutationFn:async (newData:ValidationSchema)=>{
        const res = await strapiApi.put(`/users/${user?.id}`, { contact_information:newData},{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        })
        return res.data;
      },
      onSuccess: () => {
        api.success({
          message: "Амжилттай шинэчлэгдлээ"
        })
        queryClient.invalidateQueries(useUserInfo.getKey())
      },
      onError: () => {
        api.error({
          message: "Алдаа гарлаа",
        });
      }
    })
  const onSubmit = (data: ValidationSchema) => {
        updateMutation.mutate(data)
    }

  // const isChanged = shippingAddress !== 



    return (
      <form className="ps-form--edit-address" onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <div className="ps-form__content">
          <div className="form-group">
            <label>
              Өөрийн нэр <sup>*</sup>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              defaultValue={shippingAddress?.firstname}
              {...register("firstname")}
            />
            <p>{errors?.firstname?.message}</p>
          </div>

          <div className="form-group">
            <label>
              Овог нэр <sup>*</sup>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              defaultValue={shippingAddress?.lastname}
              {...register("lastname")}
            />
            <p>{errors?.lastname?.message}</p>
          </div>
          <div className="form-group">
            <label>
              Утасны дугаар <sup>*</sup>
            </label>
            <input
              type="number"
              placeholder=""
              className="form-control"
              defaultValue={shippingAddress?.phoneNumber}
              {...register("phoneNumber")}
            />
            <p>{errors?.phoneNumber?.message}</p>
          </div>
          <div className="form-group mb-[30px]">
            <label>
              Хаяг <sup>*</sup>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              defaultValue={shippingAddress?.address}
              {...register("address")}
            />
            <p>{errors?.address?.message}</p>
          </div>
          <div className='text-end'>
          <Button size="lg" variant="brand" type="submit" disabled={isLoading}>
              Шинэчлэх
            </Button>
          </div>
           
        </div>
      </form>
    );
}

export default FormEditAddress;
