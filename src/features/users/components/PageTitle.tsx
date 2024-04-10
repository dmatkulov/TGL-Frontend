import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  title: string;
}
const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
    </>
  );
};

export default PageTitle;
