import React from "react"
import "./styles.scss"



const RButton = props => {
  const {
    buttonName,
    handleButtonClick,
    externalClassName,
    bgColor,
    color,
    border,
    text,
  } = props
  return (
    <button
      className={`defaultButtonClass ${text ?? ""} ${border ?? "border-none"} ${
        bgColor ?? "bg-secondary"
      } ${color ?? "text-black"} rounded-full ${externalClassName}`}
      
      onClick={handleButtonClick}
    >
      {buttonName}
    </button>
  )
}

export default RButton

