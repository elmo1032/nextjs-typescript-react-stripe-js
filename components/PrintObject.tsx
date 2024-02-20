// Import the React library
import React from 'react';

// Define the type for the props that will be passed to this component
type Props = {
  // The content property is an object
  content: object;
};

// Define the PrintObject functional component
const PrintObject = ({ content }: Props) => {
  // Convert the content object to a formatted string using JSON.stringify()
  const formattedContent = JSON.stringify(content, null, 2);

  // Return a <pre> element that displays the formatted content
  return <pre>{formattedContent}</pre>;
};

// Export the PrintObject component for use in other modules
export default PrintObject;
