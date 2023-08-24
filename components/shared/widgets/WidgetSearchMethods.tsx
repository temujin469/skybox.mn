import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Divider, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import useAppState from '~/hooks/useAppState';
import useFilter from '~/hooks/useFilter';
import xmljs from "xml2js";
import { useQueryClient } from '@tanstack/react-query';
import useBatchSearchItemsFrame from '~/apiCall/otapi/useBatchSearchItemsFrame';

function WidgetSearchMethods() {
  const router = useRouter();
  const { catId, brandId, min, max, keyword } = router.query;
  const { searchPropertyContents } = useAppState();
  const {setFilter} = useFilter()

  type AppliedSearch = {
    pId: string
    vId: string
  }

  const [appliedSearchValues, setAppliedSearchValues] = useState<AppliedSearch[] | undefined>();
  const queryClient = useQueryClient()

  const handleCheck = (newAppliedSearch: AppliedSearch) => {
    const existSearchValue = appliedSearchValues?.find(searchValue => searchValue.pId === newAppliedSearch.pId && searchValue.vId === newAppliedSearch.vId);

    if (!existSearchValue) {
      setAppliedSearchValues(appliedSearch => {
        if (appliedSearch) {
          return [...appliedSearch, newAppliedSearch]
        }else {
          return [newAppliedSearch]
        }
      }
      )
    } else {
      setAppliedSearchValues(appliedSearch => appliedSearch?.filter(searchValue => searchValue.vId !== newAppliedSearch.vId))
    }

    // console.log(appliedSearchValues)
  }

  const applySearchProperty = ()=>{
    const configurators:ProductFilter["Configurators"] | undefined = appliedSearchValues?.map(searchValue=>({Configurator:{
      $:{
        Pid: searchValue.pId,
        Vid: searchValue.vId
      }
    }}));

    console.log(configurators)
    setFilter({Configurators:configurators})
    const oldQuery = router.query

    const query = {
        ...oldQuery,
        filtered:true
      }

    const newQuery = Object.entries(query).map(item => {
      return `${item[0]}=${item[1]}`;
    })
    queryClient.invalidateQueries(useBatchSearchItemsFrame.getKey())
    router.push(`/shop?${newQuery.join("&")}`);
  }

  const clearProperty = (pId:string)=>{
    setAppliedSearchValues(appliedSearch => appliedSearch?.filter(searchValue => searchValue.pId !== pId))
  }

  const clearAll = () => {
    setAppliedSearchValues(undefined)
    const oldQuery = router.query
    const query = {
      ...oldQuery,
      filtered: false
    }

    const newQuery = Object.entries(query).map(item => {
      return `${item[0]}=${item[1]}`;
    })
    router.push(`/shop?${newQuery.join("&")}`);
  }


  return (
    <div>
      <aside className="rounded-md bg-white">
        <div>
            <Heading size="md" p={"20px"}>Шүүлтүүр</Heading>
          <div>
            <Divider />
            {
              searchPropertyContents?.map(property => (
                <Accordion allowToggle>
                  <AccordionItem borderTop={0}>
                    <AccordionButton
                    //  _expanded={{ bg: 'gray.200' }}
                    >
                      <Box as="span" flex='1' textAlign='left' whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        <Heading fontSize="15px" className=' text-gray-600'>
                          {property.Name}
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      {
                        property?.Values?.map(value => {
                          const isCheked = appliedSearchValues?.find(searchValue => searchValue.pId === property.Id && searchValue.vId === value.Id);
                          return (
                            <Checkbox whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" isChecked={Boolean(isCheked)} display="block" onChange={(e) => {
                              return handleCheck({ pId: property.Id, vId: value.Id })
                            }}>
                                {value.Name}
                            </Checkbox>
                          )
                        })
                      }
                      <div className='flex gap-2 mt-[10px]'>
                        <Button w="full" size="sm"  onClick={clearAll}>
                          Арилгах
                        </Button>
                        <Button w="full" size="sm" variant="brand" onClick={applySearchProperty}>
                          Хайх
                        </Button>
                      </div>
                  
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))
            }
            <div className='flex gap-2 p-[20px]'>
              <Button w="full" onClick={clearAll}>
                Цэвэрлэх
              </Button>
              <Button w="full" variant="brand" onClick={applySearchProperty}>
                Хайх
              </Button>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}

export default WidgetSearchMethods;
