import React, { useEffect, useState } from "react";
import * as Lucide from "react-icons/lu";


type Props = {
  iconName: string | null
  size?: number
  color?: string
}

const Icon = (props: Props) => {
  const { iconName, size, color } = props;
  const LucideIcon: any = Lucide
  let icon:React.ReactNode

  if(iconName){
    const existIcon = Object.keys(Lucide).find(key => key === iconName)

    // useEffect(() => {
    //   if (iconName) {
    // const library: string = iconName.slice(0, 2)
    icon = Boolean(existIcon) ? React.createElement(LucideIcon[iconName]) : undefined
  //   }
  // }, [])
  }

  return <div style={{ fontSize: size || 17, color: color || '#141414' }}>{icon ? icon : <Lucide.LuLaugh/>}</div>;

};

export default Icon;