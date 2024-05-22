import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import ShipmentsTableHead from './ShipmentsTableHead';
import ShipmentsRowItem from './ShipmentsRowItem';
import { ShipmentData } from '../../../types/types.Shipments';

interface Props {
  order: ShipmentData;
}
const ShipmentsSearchResult: React.FC<Props> = ({ order }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <ShipmentsTableHead />
        </TableHead>
        <TableBody>
          <ShipmentsRowItem key={order._id} shipment={order} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentsSearchResult;
