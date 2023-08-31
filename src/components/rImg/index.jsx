
import React from 'react'

const RImg = (props) => {
    const{
        handleImgClick,
        externalClassName,
        src,
        alt,
        width = "100%",
        height = "100%",
        innerImgWidth,
        innerImgHeight,
        innerImgClassName,
    }=props;
  return (
    React.createElement("div", {
        onClick: handleImgClick,
        className: `${externalClassName} imgContainer`,
        style: { width, height }
      },
      React.createElement("img", {
        className: `${innerImgClassName}`,
        style: { width: innerImgWidth, height: innerImgHeight },
        src: src,
        alt: alt
      })
    )
  );
};

export default RImg;