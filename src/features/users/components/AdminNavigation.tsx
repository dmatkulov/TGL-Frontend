import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
    name: 'Склад в Китае',
    navLink: appRoutes.adminWarehouses,
    icon: <WarehouseIcon color="primary" />,
  },
];

const AdminNavigation = () => {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<number | null>(null);

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav>
          <List>
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
