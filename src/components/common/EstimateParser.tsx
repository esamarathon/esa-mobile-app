import React from 'react';

interface IProps {
  seconds: number;
}

function EstimateParser({seconds}: IProps) {
  const parsedTimer = new window.Date(seconds * 1000).toISOString().substr(11, 8);
  return <>{parsedTimer}</>;
}

export default EstimateParser;
