import React from 'react';
import CurvedText from 'react-curved-text';

function CustomCurvedText({ text, className }) {
  // Adjust the textProps to include the fill color along with fontSize
  // You can also pass fontFamily here, but ensure the font is loaded as described previously
  const textProps = {
    style: {
      fontSize: '64px', // Ensure this is a string when setting it directly
      fontFamily: "'Namecat', sans-serif",
      fill: 'gold', // Use fill for color in SVG
    }
  };

  return (
    <CurvedText
      text={text}
      className={className} // Apply any additional class names if needed
      width={300}
      height={300}
      cx={150}
      cy={250}
      rx={100}
      ry={100}
      startOffset={0}
      reversed={true}
      textProps={textProps} // Apply the textProps here
      textPathProps={null}
      tspanProps={null}
      ellipseProps={null}
      svgProps={null}
    />
  );
}

export default CustomCurvedText;
