import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    marginTop: 10,
  },
  tableHeading:{
    marginTop: 50,
    textAlign:"center"
  }
});

export default function StickyHeadTable({ rows }) {
  const classes = useStyles();
  if (!_.isEmpty(rows)) {
    return (
      <div> <h3 className={classes.tableHeading}>Assessment done for this facility</h3>
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell> Assessment Number </TableCell>
                <TableCell> Assessment Tool </TableCell>
                <TableCell> Assessment Type </TableCell>
                <TableCell>Start date</TableCell>
                <TableCell>End date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.assessmentNumber}>
                    <TableCell>
                      {row.assessmentNumber}
                    </TableCell>
                    <TableCell>
                      {row.assessmentToolName}
                    </TableCell>
                    <TableCell>
                      {row.assessmentTypeName}
                    </TableCell>
                    <TableCell>
                      {row.assessmentStartDate}
                    </TableCell>
                    <TableCell>
                      {row.assessmentEndDate}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </div>
    );
  }
  return null;
}
