import React from "react";
import Link from "next/link";
import { Heading, Text } from "@chakra-ui/react";
import useSiteConfiguration from "~/apiCall/strapi/useSiteConfiguration";

const FooterWidgets = () => {
  const { data } = useSiteConfiguration();
  const contactUs = data?.data?.attributes?.contactUs;
  return (
    <div className="ps-footer__widgets">
      <aside className="widget widget_footer widget_contact-us pr-4">
        <Heading fontSize="17px" mb={5}>
          Холбоо барих
        </Heading>
        {contactUs ? (
          <div className="widget_content">
            <p>{contactUs.phoneNumber.split(",")[0]}</p>
            <Text maxW="300px">
              {contactUs.location}
              <br />
              <a href="mailto:contact@martfury.co">{contactUs.email}</a>
            </Text>
            <ul className="ps-list--social">
              <li>
                <a className="facebook" href={contactUs.facebook || "#"}>
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a className="google-plus" href="#">
                  <i className="fa fa-google-plus"></i>
                </a>
              </li>
              <li>
                <a className="instagram" href={contactUs.instagram || "#"}>
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </aside>
      <aside className="widget widget_footer">
        <Heading fontSize="17px" mb={5}>
          Холбоосууд
        </Heading>
        <ul className="ps-list--link">
          <li>
            <Link href="/privacy">
              <p>Хэрэглэгчийн хамгаалалт</p>
            </Link>
          </li>
          <li>
            <Link href="/faqs">
              <p>Их асуудаг асуултууд</p>
            </Link>
          </li>
          <li>
            <Link href="/hemjee-razmer">
              <p>Хэмжээ размерын хүснэгт</p>
            </Link>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer">
        <Heading fontSize="17px" mb={5}>
          Компани
        </Heading>
        <ul className="ps-list--link">
          <li>
            <Link href="/about-us">
              <p>Бидний тухай</p>
            </Link>
          </li>
          <li>
            <Link href="/contact-us">
              <p>Холбоо барих</p>
            </Link>
          </li>
          <li>
            <Link href="/agreement">
              <p>Үйлчилгээний нөхцөл</p>
            </Link>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer">
        <Heading fontSize="17px" mb={5}>
          Хэрэглэгч
        </Heading>
        <ul className="ps-list--link">
          <li>
            <Link href="/account/shopping-cart">
              <p>Миний сагс</p>
            </Link>
          </li>
          <li>
            <Link href="/account/wishlist">
              <p>Надад таалагдсан</p>
            </Link>
          </li>
          <li>
            <Link href="/account/compare">
              <p>Бүтээгдэхүүн харьцуулах</p>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default FooterWidgets;
