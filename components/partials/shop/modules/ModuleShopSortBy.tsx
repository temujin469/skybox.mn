import { Select } from "@chakra-ui/react";
import React from "react";

const ModuleShopSortBy = () => {
  return (
    <Select placeholder="Эрэмбэлэх" maxW={230}>
      <option value="option1">Шинэ бараа эхэндээ</option>
      <option value="option2">Хуучин бараа эхэндээ</option>
      <option value="option3">Хямд үнтэй нь эхэндээ</option>
      <option value="option3">Үнтэй нь эхэндээ</option>
    </Select>
  );
};

export default ModuleShopSortBy;
