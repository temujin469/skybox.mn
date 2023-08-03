import React from 'react';
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod";
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { strapiApi } from '~/utilities/axios';
import useUserInfo from '~/apiCall/strapi/useUserInfo';
import { notification } from 'antd';


 const infoSchema = z.object({
   username: z.string(),
   email: z.string().email(),
//    address: z.string(),
//    phoneNumber: z.number(),
 });

// type ValidationSchema = z.infer<typeof infoSchema>;


const FormChangeUserInformation = () => {

    const {token} = useSelector(state=>state.auth);
     const [api, contextHolder] = notification.useNotification();


    const { data:user } = useUserInfo({ variables:{jwt:token}});

    const queryClient = useQueryClient()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{
            username:user?.username,
            email:user?.email
        },
        resolver: zodResolver(infoSchema),
    })

    const updateMutation = useMutation({
      mutationFn: async (newData) => {
        const res = await strapiApi.put(
          `/users/${user?.id}`,
          newData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      },
      onSuccess:()=>{
        api.success({
            message:"Амжилттай шинэчлэгдлээ"
        })
        queryClient.invalidateQueries(useUserInfo.getKey())
      },
      onError:()=>{
        api.error({
          message: "Алдаа гарлаа",
        });
      }
    });
    const onSubmit = (data) => {
      updateMutation.mutate(data);
    };


    return (
      <form className="ps-form--account-setting">
        {contextHolder}
        <div className="ps-form__header">
          <h3>Хэрэглэгчийн мэдээлэл</h3>
        </div>
        <div className="ps-form__content">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              defaultValue={user?.username}
              placeholder="Хэрэглэгчийн нэр"
              {...register("username")}
            />
            <p>{errors.username?.message}</p>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              defaultValue={user?.email}
              placeholder="Имэйл хаяг"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className="row">
            {/* <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Өөрийн нэр"
                                {...register("firstname")}
                            />
                            <p>{errors.firstname?.message}</p>
                        </div>
                    </div> */}
            {/* <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Овог нэр"
                                {...register("lastname")}
                            />
                            <p>{errors.lastname?.message}</p>

                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Утасны дугаар"
                                {...register("phoneNumber")}

                            />
                            <p>{errors.phoneNumber?.message}</p>

                        </div>
                    </div> */}
            {/* <div className="col-sm-6">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Имэйл хаяг"
                  {...register("email")}
                />
                <p>{errors.email?.message}</p>
              </div>
            </div> */}
          </div>

          <div className="form-group submit">
            <button className="ps-btn" onClick={handleSubmit(onSubmit)}>
              Шинэчлэх
            </button>
          </div>
        </div>
      </form>
    );
};

export default FormChangeUserInformation;
