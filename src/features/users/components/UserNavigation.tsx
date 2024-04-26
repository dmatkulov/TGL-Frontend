import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';
import { useState } from 'react';
import { UserNav } from '../../../types/types.User';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import HistoryIcon from '@mui/icons-material/History';

const userLinks: UserNav[] = [
  {
    id: 1,
    name: 'Трекинг по номеру',
    navLink: appRoutes.tracking,
    icon: <PinDropIcon color="primary" />,
  },
  {
    id: 2,
    name: 'Мои заказы',
    navLink: appRoutes.orders,
    icon: <LocalShippingIcon color="primary" />,
  },
  {
    id: 3,
    name: 'Адреса складов',
    navLink: appRoutes.address,
    icon: <WarehouseIcon color="primary" />,
  },
  {
    id: 4,
    name: 'История заказов',
    navLink: appRoutes.history,
    icon: <HistoryIcon color="primary" />,
  },
];

const UserNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:760px)');

  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<number | null>(null);

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <nav>
          <List sx={{
            display: isSmallScreen ? 'flex' : '',
            flexWrap: isSmallScreen ? 'wrap' : '',
          }}>
            {userLinks.map((link) => (
              <ListItem key={link.id} disableGutters>
                <ListItemButton
                  selected={selectedLink === link.id}
                  onClick={() => {
                    setSelectedLink(link.id);
                    navigate(link.navLink);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontSize: 20,
                      color: selectedLink === link.id ? 'primary' : 'inherit',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </>
  );
};

export default UserNavigation;
