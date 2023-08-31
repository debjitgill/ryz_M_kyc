import React from "react";
import "./styles.scss";

const RInput = (props) => {
  const {
    externalClassName,
    onChange,
    value,
    placeHolder = "Enter Text",
    isPhoneNumber = false,
    type = "text",
    name,
    onKeyDown,
    bgColor
  } = props;

  const renderInput = () => {
    return (
      React.createElement("div", { className: "defaultInputbox" },
        React.createElement("input", {
          name: name,
          className: `defaultInput ${externalClassName}`,
          type: type,
          value: value,
          onChange: onChange,
          placeholder: placeHolder,
          onKeyDown: onKeyDown
        })
      )
    );
  };

  const renderPhoneInput = () => {
    return (
      React.createElement("div", { className: `defaultPhoneWrapper` },
        React.createElement("span", { className: `defaultCountryCode ${bgColor ?? "bg-tertiary"}` }, "+91"),
        React.createElement("input", {
          name: name,
          className: `defaultInput ${externalClassName}`,
          type: type,
          value: value,
          onChange: onChange,
          placeholder: placeHolder,
          onKeyDown: onKeyDown
        })
      )
    );
  };

  return (
    <>
      {!isPhoneNumber && renderInput()}
      {isPhoneNumber && renderPhoneInput()}
    </>
  );
};

export default RInput;
