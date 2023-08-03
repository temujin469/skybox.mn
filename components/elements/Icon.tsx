import React, { useEffect, useState } from "react";
import * as Lia from "react-icons/lia";


type Props = {
  iconName: string | null
  size?: number
  color?: string
}

const Icon = (props: Props) => {
  const { iconName, size, color } = props;
  const LiaIcon: any = Lia
  const [icon, setIcon] = useState<React.ReactNode>()

  useEffect(() => {
    if (iconName) {
      // const library: string = iconName.slice(0, 2)
      setIcon(React.createElement(LiaIcon[iconName]))
    }
  }, [])


  return <div style={{ fontSize: size || 17, color: color || '#141414' }}>{icon ? icon : null}</div>;

};

export default Icon;