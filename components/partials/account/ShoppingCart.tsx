import React, { useEffect, useState } from "react";
import Link from "next/link";
import ModuleEcomerceCartItems from "~/components/ecomerce/modules/ModuleEcomerceCartItems";
import ModuleCartSummary from "~/components/ecomerce/modules/ModuleCartSummary";
import BackButton from "~/components/elements/BackButton";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);

  const isAuth = Boolean(auth.user);
  const router = useRouter();

  const handleCheckout = () => {
    if (!auth.isLoading) {
      if (!isAuth) {
        return router.push("/account/register");
      }
      router.push("/account/checkout");
    }
  };


  // View
  let contentView;
  if (cartItems) {
    if (cartItems.length > 0) {
      contentView = (
        <div className="lg:grid grid-cols-12 gap-[20px] xl:gap-[40px]">
          <div className="col-span-8 rounded-md bg-white px-[10px] md:p-[20px] mb-20 lg:mb-0 h-fit">
            <ModuleEcomerceCartItems />
          </div>
          <div className="col-span-4 bg-white rounded-md p-[10px] md:p-[20px] h-fit">
            {/* <div className="mb-3">
                  {title && <Heading>{title}</Heading>}
                </div> */}
            <div className="ps-section__content">
              <ModuleCartSummary />
              <Button
                onClick={handleCheckout}
                variant="brand"
                size="lg"
                w="full"
                mt={10}
              >
                Тооцоо хийх
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      contentView = (
        <>
          <div className="ps-section__content">
            <div className="alert alert-info">
              <p className="mb-0">Таны сагсанд одоогоор хоосон байна.</p>
            </div>
            <div className="ps-section__cart-actions">
              <Link href="/shop">
                <BackButton>Буцах</BackButton>
              </Link>
            </div>
          </div>
        </>
      );
    }
  } else {
  }

  return (
    <section className="ps-my-account p-[10px] md:p-0">
      <div className="max-w-[1500px] md:p-[20px] xl:p-[40px] mx-auto">
        {contentView}
      </div>
    </section>
  );
};

export default ShoppingCart;
