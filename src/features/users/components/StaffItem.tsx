import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Staff } from '../../../types/types.User';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';

interface Props {
  user: Staff;
}

const StaffItem: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const userRole = useAppSelector(selectUser);
  return (
    <Card sx={{ minWidth: 275, margin: 3 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {user.role}
        </Typography>
        <Typography variant="h5" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.address}
        </Typography>
        <Typography variant="body2">{user.phoneNumber}</Typography>
      </CardContent>
      <CardActions>
        {userRole?.role === 'super' ? (
          <Button
            onClick={() => navigate('/admin-profile/edit-staff/' + user._id)}
            size="small"
          >
            Edit
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};

export default StaffItem;
