import React from 'react';

type Props = {
  content: object;
};

const PrintObject: React.FC<Props> = ({ content }) => {
  const formattedContent = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
};

export default PrintObject;
