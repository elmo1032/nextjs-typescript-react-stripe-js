// Import the React library
import React from 'react';

// Define the type for the props that this component accepts
type Props = {
  // The content prop is an object
  content: object;
};

// Define the PrintObject functional component, which is a generic
// React component that accepts props of type Props
const PrintObject: React.FC<Props> = ({ content }) => {
  // Convert the content object into a formatted string using JSON.stringify()
  const formattedContent = JSON.stringify(content, null, 2);

  // Return a <pre> element that contains the formatted content
  return <pre>{formattedContent}</pre>;
};

// Export the PrintObject component as the default export of this module
export default PrintObject;

