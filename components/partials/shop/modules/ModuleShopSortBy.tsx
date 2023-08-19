import { Select } from "@chakra-ui/react";
import React from "react";
import useFilter from "~/hooks/useFilter";

const ModuleShopSortBy = () => {
  const {setFilter,filters} = useFilter();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filters,OrderBy:e.target.value})
  }
  return (
    <Select placeholder="Хэвийн" maxW={230} onChange={handleChange}>
      <option value="UpdatedTime:Asc">Шинэ бараа эхэндээ</option>
      <option value="UpdatedTime:Desc">Хуучин бараа эхэндээ</option>
      <option value="Price:Asc">Хямд үнтэй нь эхэндээ</option>
      <option value="Price:Desc">Үнтэй нь эхэндээ</option>
    </Select>
  );
};

export default ModuleShopSortBy;
