import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

interface Props {
  type: string
  size?: any
  style?: any
  onClick?: () => void
  spin?: boolean
  pulse?: boolean
  inverse?: boolean
}

const Icon: React.FunctionComponent<Props> =
({ onClick,type, size ,style,spin,pulse,inverse}): React.ReactElement => {
  return (
    <FontAwesomeIcon
      pulse={pulse}
      inverse={inverse}
      spin={spin}
      onClick={() => {
        if(onClick){
          onClick()
        }
      }}
      style={{...(style !== undefined && style)}}
      icon={icons[type]}
      size={size}
    />
  );
}

export default Icon;