import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, useMediaQuery,
} from '@mui/material';
import { adminLinks } from '../../../utils/constants';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
              <ListItem key={link.id}>
                <ListItemButton
                  selected={selectedLink === link.id}
                  onClick={() => {
                    setSelectedLink(link.id);
                    navigate(link.navLink);
                  }}
                >
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText primary={link.name} />
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
