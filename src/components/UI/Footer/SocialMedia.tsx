import React from 'react';
import { CardMedia, Link, Typography } from '@mui/material';

interface Props {
  href: string;
  tiktok?: boolean;
  whatsapp?: boolean;
  instagram?: boolean;
  imagePath: string;
  alt: string;
  title: string;
}
const SocialMedia: React.FC<Props> = ({
  href,
  tiktok = false,
  whatsapp = false,
  instagram = false,
  imagePath,
  alt,
  title,
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
          gap: 2,
          textDecoration: 'none',
          py: 1,
          px: 1,
          bgcolor: itemBgColor.staticColor,
          borderRadius: 2,
          '&:hover': {
            bgcolor: itemBgColor.hoverColor,
          },
        }}
      >
        <CardMedia
          sx={{ width: 24, height: 24 }}
          component="img"
          alt={alt}
          image={imagePath}
        />
        <Typography color="white">{title}</Typography>
      </Link>
    </>
  );
};

export default SocialMedia;
