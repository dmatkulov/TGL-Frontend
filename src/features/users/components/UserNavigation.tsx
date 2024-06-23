import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useMediaQuery,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';
import { UserNav } from '../../../types/types.User';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const userLinks: UserNav[] = [
  {
    id: 1,
    name: 'Информация',
    navLink: appRoutes.information,
    icon: <AssignmentIcon color="primary" />,
  },
  {
    id: 2,
    name: 'Мой профиль',
    navLink: appRoutes.myProfile,
    icon: <AccountBoxIcon color="primary" />,
  },
  {
    id: 3,
    name: 'Мои заказы',
    navLink: appRoutes.orders,
    icon: <LocalShippingIcon color="primary" />,
  },
  {
    id: 4,
    name: 'Трекинг по номеру',
    navLink: appRoutes.tracking,
    icon: <PinDropIcon color="primary" />,
  },
  {
    id: 5,
    name: 'Адреса складов',
    navLink: appRoutes.address,
    icon: <WarehouseIcon color="primary" />,
  },
  {
    id: 6,
    name: 'История заказов',
    navLink: appRoutes.history,
    icon: <HistoryIcon color="primary" />,
  },
];

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const UserNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:599px)');

  const navigate = useNavigate();
  const activePath = location.pathname;

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <nav>
          <List
            dense
            sx={{
              display: isSmallScreen ? 'flex' : '',
              flexWrap: isSmallScreen ? 'wrap' : '',
            }}
          >
            {userLinks.map((link) => (
              <ListItem key={link.id} disableGutters>
                <ListItemButton
                  selected={activePath === link.navLink}
                  onClick={() => {
                    navigate(link.navLink);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontSize: 16,
                      color:
                        activePath === link.navLink ? 'primary' : 'inherit',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {isExtraSmallScreen && (
            <Box
              sx={{
                marginBottom: 3,
                padding: '4px 16px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CalculateIcon color="primary" />
              <Link to={appRoutes.calculate} sx={{ paddingLeft: '32px' }}>
                Калькулятор
              </Link>
            </Box>
          )}
        </nav>
      </Box>
    </>
  );
};

export default UserNavigation;
