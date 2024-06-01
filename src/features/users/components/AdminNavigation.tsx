import {
  Box,
  Container,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useScrollTrigger,
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
import GroupsIcon from '@mui/icons-material/Groups';
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Block } from '@mui/icons-material';
const adminLinks: UserNav[] = [
  {
    id: 1,
    name: 'Мой профиль',
    navLink: appRoutes.myAdminProfile,
    icon: <AnalyticsIcon color="primary" />,
  },
  {
    id: 2,
    name: 'Статистика',
    navLink: appRoutes.statistics,
    icon: <AnalyticsIcon color="primary" />,
  },
  {
    id: 3,
    name: 'ПВЗ',
    navLink: appRoutes.pups,
    icon: <StoreIcon color="primary" />,
  },
  {
    id: 4,
    name: 'Сотрудники',
    navLink: appRoutes.staff,
    icon: <PeopleIcon color="primary" />,
  },
  {
    id: 5,
    name: 'Заказы клиентов',
    navLink: appRoutes.shipments,
    icon: <LocalGroceryStoreIcon color="primary" />,
  },
  {
    id: 6,
    name: 'Создать заказ',
    navLink: appRoutes.shipmentForm,
    icon: <FeedIcon color="primary" />,
  },
  {
    id: 7,
    name: 'Склад в Китае',
    navLink: appRoutes.adminWarehouses,
    icon: <WarehouseIcon color="primary" />,
  },
  {
    id: 8,
    name: 'Физический адрес',
    navLink: appRoutes.adminCompanyAddress,
    icon: <HomeIcon color="primary" />,
  },
  {
    id: 9,
    name: 'Цена',
    navLink: appRoutes.price,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 10,
    name: 'Прайс-лист',
    navLink: appRoutes.priceLists,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 11,
    name: 'Социальные сети',
    navLink: appRoutes.socials,
    icon: <RecommendIcon color="primary" />,
  },
  {
    id: 12,
    name: 'Клиенты',
    navLink: appRoutes.adminClients,
    icon: <GroupsIcon color="primary" />,
  },
  {
    id: 12,
    name: 'Запрет',
    navLink: appRoutes.adminBanned,
    icon: <Block color="primary" />,
  },
];

interface ScrollTopProps {
  children: React.ReactElement;
  window?: Window;
}

const AdminNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');

  const navigate = useNavigate();
  const [_selectedLink, setSelectedLink] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const activePath = location.pathname;
  const handleScrollTopClick = () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
  function ScrollTop(props: ScrollTopProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window || undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = () => {
      if (window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{
                width: 250,
                flexShrink: 0,
              }}
            >
              <List>
                {adminLinks.map((link) => (
                  <ListItem
                    key={link.id}
                    disableGutters
                    onClick={() => {
                      setSelectedLink(link.id);
                      navigate(link.navLink);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ListItemButton selected={activePath === link.navLink}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText
                        primary={link.name}
                        primaryTypographyProps={{
                          fontSize: 16,
                          color: activePath === link.navLink ? 'primary' : 'inherit',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <>
          <Container sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderColor: 'grey.400',
                borderRadius: '16px',
                borderWidth: '1px',
                maxHeight: 'calc(100vh - 64px - 20px)',
              }}
            >
              <nav>
                <List>
                  {adminLinks.map((link) => (
                    <ListItem key={link.id} disableGutters>
                      <ListItemButton
                        selected={activePath === link.navLink}
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
                            fontSize: 16,
                            color: activePath === link.navLink ? 'primary' : 'inherit',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Box>
          </Container>
        </>
      )}
      <ScrollTop>
        <Fab
          size="small"
          aria-label="scroll back to top"
          onClick={handleScrollTopClick}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default AdminNavigation;
