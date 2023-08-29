export const handleErrorMessage = (error: any): string => {
  console.log(error);
  let message;
  if (error?.response?.data?.error) {
    const errorName = error.response.data.error?.name;
    const errorMsg = error.response.data.error?.message;
    message =
      errorName == "ValidationError"
        ? "Имэйл эсвэл нууц үг буруу!"
        : errorName == "ApplicationError"
        ? "Имэйл аль хэдийн бүртгэгдсэн!"
        : errorMsg || "Алдаа гарлаа";
  }

  return message;
};
