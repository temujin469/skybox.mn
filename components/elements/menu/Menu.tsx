import React from 'react';
import Link from 'next/link';
import MegaMenu from './MegaMenu';

const Menu = ({ className,source,isMega }:{className?:string,source?:MenuItem[],isMega:boolean}) => {
    // const { data, isLoading } = useQuery({
    //     queryKey: ['getBriefCatalog'],
    //     queryFn: getBriefCatalog,
    // });

    
    let menuView;
    if (source) {
        menuView = source.map((item) => {
                return (
                    <>
                        <li key={item.text}>
                            <Link href={item.url!}>
                                    {item.icon && <i className={item.icon}></i>}
                                    {item.text}
                            </Link>
                        </li>
                    </>
                );
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    Хайж байна...
                </a>
            </li>
        );
    }
    return <ul className={className}>
        {isMega ? <MegaMenu/> : menuView}
    </ul>;
};

export default Menu;
