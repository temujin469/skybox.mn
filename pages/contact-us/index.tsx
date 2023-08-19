import React from 'react';
import { LuCalendarClock, LuMapPin, LuPhone } from 'react-icons/lu';
import useSiteConfiguration from '~/apiCall/strapi/useSiteConfiguration';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
// import { MapPin, Phone, Cloudy } from 'lucide-react';


function ContactUs() {

  const { data, isLoading } = useSiteConfiguration()

  const contactUs = data?.data?.attributes?.contactUs;
  const breadCrumb = [
    {
      text: 'Холбоо барих',
    },
  ];

  return (
    <PageContainer title='Холбоо барих'>
      <BreadCrumb breadcrumb={breadCrumb} />
      {/* <Box my="30px" className='ps-container'>
       
      </Box> */}
      <div className='bg-white'>
        <div className='mx-auto max-w-[1800px]'>
          <div className="mb-24 mx-auto 2xl:px-6">
            {/* <!-- Section: Design Block --> */}
            <section className="mb-32">
              <div className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/284.jpg')]"></div>
              <div className="container px-6 md:px-12">
                <div
                  className="block rounded-lg bg-[#ffffffc9] px-6 py-6 sm:py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  md:py-16 md:px-12 -mt-[100px] backdrop-blur-[20px]">
                  <div className="flex flex-wrap">
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                      <iframe src={contactUs?.googleMapSrc} style={{
                        border: 0
                      }} loading="lazy" className='w-full h-full rounded-lg'></iframe>
                    </div>
                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                      <div className="flex flex-wrap">
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                          <div className="flex items-start">
                            <div className="shrink-0">
                              <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                <LuMapPin className='text-gray-700' size={30} />
                              </div>
                            </div>
                            <div className="ml-6 grow">
                              <p className="mb-2 font-bold text-gray-700">
                                Хаяг
                              </p>
                              <p className="text-neutral-500">
                                {contactUs?.location}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                          <div className="flex items-start">
                            <div className="shrink-0">
                              <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                <LuCalendarClock className='text-gray-700' size={30} />
                              </div>
                            </div>
                            <div className="ml-6 grow">
                              <p className="mb-2 font-bold text-gray-700">
                                Ажлын цаг
                              </p>
                              <p className="text-neutral-500 ">
                                {contactUs?.workingHours}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                          <div className="align-start flex">
                            <div className="shrink-0">
                              <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                <LuPhone className='text-gray-700' size={30} />
                              </div>
                            </div>
                            <div className="ml-6 grow">
                              <p className="mb-2 font-bold text-gray-700">Утасны дугаар</p>
                              <p className="text-neutral-500">
                              </p>
                              <p className="text-neutral-500">
                                {
                                  contactUs?.phoneNumber.split(',').map(item=>(
                                    <div>
                                      {item} 
                                      <br />
                                    </div>
                                  ))
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                        <div className="align-start flex">
                          <div className="shrink-0">
                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" className="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-6 grow">
                            <p className="mb-2 font-bold dark:text-white">Bug report</p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              bugs@example.com
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              +1 234-567-89
                            </p>
                          </div>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Section: Design Block --> */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ContactUs;