import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, useMediaQuery,
} from '@mui/material';
import { appRoutes } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserNav } from '../../../types/types.User';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RecommendIcon from '@mui/icons-material/Recommend';

const adminLinks: UserNav[] = [
  {
    id: 1,
    name: 'Статистика',
    navLink: appRoutes.statistics,
    icon: <AnalyticsIcon color="primary" />,
  },
  {
    id: 2,
    name: 'ПВЗ',
    navLink: appRoutes.pups,
    icon: <StoreIcon color="primary" />,
  },
  {
    id: 3,
    name: 'Сотрудники',
    navLink: appRoutes.staff,
    icon: <PeopleIcon color="primary" />,
  },
  {
    id: 4,
    name: 'Заказы клиентов',
    navLink: appRoutes.shipments,
    icon: <LocalGroceryStoreIcon color="primary" />,
  },
  {
    id: 5,
    name: 'Создать заказ',
    navLink: appRoutes.shipmentForm,
    icon: <FeedIcon color="primary" />,
  },
  {
    id: 6,
    name: 'Склад в Китае',
    navLink: appRoutes.adminWarehouses,
    icon: <WarehouseIcon color="primary" />,
  },
  {
    id: 7,
    name: 'Физический адрес',
    navLink: appRoutes.adminCompanyAddress,
    icon: <HomeIcon color="primary" />,
  },
  {
    id: 8,
    name: 'Цена',
    navLink: appRoutes.price,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 9,
    name: 'Социальные сети',
    navLink: appRoutes.socials,
    icon: <RecommendIcon color="primary" />,
  },
];

const AdminNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:760px)');

  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<number | null>(null);

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <nav>
          <List
            sx={{
              display: isSmallScreen ? 'flex' : '',
              flexWrap: isSmallScreen ? 'wrap' : '',
            }}>
            {adminLinks.map((link) => (
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

export default AdminNavigation;
