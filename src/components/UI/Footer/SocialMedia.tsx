import React from 'react';
import { CardMedia, Link } from '@mui/material';

interface Props {
  href: string;
  tiktok?: boolean;
  whatsapp?: boolean;
  instagram?: boolean;
  imagePath: string;
  alt: string;
}
const SocialMedia: React.FC<Props> = ({
  href,
  tiktok = false,
  whatsapp = false,
  instagram = false,
  imagePath,
  alt,
}) => {
  const itemBgColor: Record<string, string> = {
    staticColor: '',
    hoverColor: '',
  };
  if (whatsapp) {
    itemBgColor.staticColor = '#128c7e';
    itemBgColor.hoverColor = '#075e54';
  } else if (instagram) {
    itemBgColor.staticColor = '#bc2a8d';
    itemBgColor.hoverColor = '#a41779';
  } else if (tiktok) {
    itemBgColor.staticColor = '#212121';
    itemBgColor.hoverColor = '#151515';
  }

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
          bgcolor: itemBgColor.staticColor,
          borderRadius: '50%',
          '&:hover': {
            bgcolor: itemBgColor.hoverColor,
          },
        }}
      >
        <CardMedia
          sx={{ width: 22, height: 22 }}
          component="img"
          alt={alt}
          image={imagePath}
        />
      </Link>
    </>
  );
};

export default SocialMedia;
