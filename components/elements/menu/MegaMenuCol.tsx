import Link from 'next/link';
import React from 'react';

type Props = {
  mega:{
    id: number;
    name: string;
    category_id: string;
    subCategories: {
      name: string;
      id: number;
      category_id: string;
    }[];
  }
}

function MegaMenuCol({ mega }: Props) {

  return (
    <div className="mega-menu__column">
      <h4>{mega.name}</h4>
      <ul className="mega-menu__list">
        {mega.subCategories?.slice(0,10)?.map((cat) => (
          <li key={cat.id}>
            <Link href="#">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MegaMenuCol;
