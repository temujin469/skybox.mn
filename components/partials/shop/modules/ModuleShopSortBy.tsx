import { Select } from "@chakra-ui/react";
import {Select as AntSelect} from "antd"
import React from "react";
import useFilter from "~/hooks/useFilter";

const ModuleShopSortBy = () => {
  const {setFilter,filters} = useFilter();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | undefined,value:string | undefined) => {
    setFilter({...filters,OrderBy:value ? value : e?.target.value});
  }

  return (
    <div>
      <Select display={{base:"block",md:"none"}} placeholder="Хэвийн" maxW={230} onChange={(e)=>handleChange(e,undefined)}>
        <option value="UpdatedTime:Asc">Шинэ бараа эхэндээ</option>
        <option value="UpdatedTime:Desc">Хуучин бараа эхэндээ</option>
        <option value="Price:Asc">Хямд үнтэй нь эхэндээ</option>
        <option value="Price:Desc">Үнтэй нь эхэндээ</option>
      </Select>
      <AntSelect
        // style={{ maxWidth:"230px",width:"100%" }}
        size="large"
        onChange={(value)=>handleChange(undefined,value)}
        className="w-[230px] hidden md:block"
        placeholder="Эрэмбэлэх"
        options={[
          { value: '', label: 'Энгийн' },
          { value: 'UpdatedTime:Asc', label: 'Шинэ бараа эхэндээ' },
          { value: 'UpdatedTime:Desc', label: 'Хуучин бараа эхэндээ' },
          { value: 'Price:Asc', label: 'Хямд үнтэй нь эхэндээ' },
          { value: 'Price:Desc', label: 'Үнтэй нь эхэндээ' },
        ]}
      />
    </div>
  );
};

export default ModuleShopSortBy;
