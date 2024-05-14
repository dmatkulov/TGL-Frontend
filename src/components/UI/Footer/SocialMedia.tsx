import React from 'react';
import { CardMedia, Link } from '@mui/material';
import { apiURL } from '../../../utils/constants';

interface Props {
  href: string;
  imagePath: string | null;
  name: string;
}
const SocialMedia: React.FC<Props> = ({ href, imagePath, name }) => {
  const apiImgPath = apiURL + '/' + imagePath;
  const defaultImgPath = 'http://localhost:5173/assets/no-social-icon.png';

  return (
    <>
      <Link
        href={href}
        target="_blank"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          textDecoration: 'none',
          borderRadius: '50%',
        }}
      >
        <CardMedia
          sx={{
            width: 40,
            height: 40,
            objectFit: 'contain',
          }}
          component="img"
          alt={name}
          image={imagePath ? apiImgPath : defaultImgPath}
        />
      </Link>
    </>
  );
};

export default SocialMedia;
