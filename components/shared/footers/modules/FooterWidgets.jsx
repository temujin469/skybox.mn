import React from 'react';
import Link from 'next/link';
import { Heading, Text } from '@chakra-ui/react';

const FooterWidgets = () => (
  <div className="ps-footer__widgets">
    <aside className="widget widget_footer widget_contact-us">
      <Heading fontSize="17px" mb={5}>Холбоо барих</Heading>
      <div className="widget_content">
        <p>+976 75104000</p>
        <Text>
          502 New Design Str, Melbourne, Australia <br />
          <a href="mailto:contact@martfury.co">contact@skybox.mn</a>
        </Text>
        <ul className="ps-list--social">
          <li>
            <a className="facebook" href="#">
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
            <a className="instagram" href="#">
              <i className="fa fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <aside className="widget widget_footer">
      <Heading fontSize="17px" mb={5}>холбоосууд</Heading>
      <ul className="ps-list--link">
        <li>
          <Link href="/page/blank">
            <p>Хугацаа ба нөхцөл</p>
          </Link>
        </li>
        <li>
          <Link href="/page/blank">
            <p>Хүргэлт</p>
          </Link>
        </li>
        <li>
          <Link href="/page/faqs">
            <p>Түгээмэл асуулт</p>
          </Link>
        </li>
      </ul>
    </aside>
    <aside className="widget widget_footer">
      <Heading fontSize="17px" mb={5}>Компани</Heading>
      <ul className="ps-list--link">
        <li>
          <Link href="/page/about-us">
            <p>Бидний тухай</p>
          </Link>
        </li>
        <li>
          <Link href="/page/blank">
            <p>Түншүүд</p>
          </Link>
        </li>
        <li>
          <Link href="/page/blank">
            <p>Карьер</p>
          </Link>
        </li>
      </ul>
    </aside>
    <aside className="widget widget_footer">
      <Heading fontSize="17px" mb={5}>Бизнес</Heading>
      <ul className="ps-list--link">
        <li>
          <Link href="#">
            <p>Манай хэвлэл</p>
          </Link>
        </li>
        <li>
          <Link href="#">
            <p>Тооцоо хийх</p>
          </Link>
        </li>
        <li>
          <Link href="#">
            <p>Миний бүртгэл</p>
          </Link>
        </li>
      </ul>
    </aside>
  </div>
);

export default FooterWidgets;
