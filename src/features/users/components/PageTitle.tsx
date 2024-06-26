import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';

interface Props {
  title: string;
}
const PageTitle: React.FC<Props> = ({ title }) => {
  const isSmallScreen = useMediaQuery('(max-width:860px)');

  return (
    <>
      <Typography variant={isSmallScreen ? 'h5' : 'h4'} component="h2" mb={5}>
        {title}
      </Typography>
    </>
  );
};

export default PageTitle;
