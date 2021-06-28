import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({

  tableContainer: {
    marginTop: 20,
 }
});
export default function BasicTable(facility) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Facility Name</TableCell>
            <TableCell>Facility Type</TableCell>
            <TableCell>District</TableCell>
            <TableCell>State</TableCell>
            <TableCell>NIN Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {facility.facility.facilityName}
            </TableCell>
            <TableCell>{facility.facility.districtName}</TableCell>
            <TableCell>{facility.facility.stateName}</TableCell>
            <TableCell>{facility.facility.facilityType}</TableCell>
            <TableCell>{facility.facility.registryUniqueId}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
