import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'id', label: 'ID', maxWidth: 10 },
  { id: 'img', label: 'Image', maxWidth: 40 },
  { id: 'name', label: 'Full Name', maxWidth: 40 },
  { id: 'alias', label: 'Alias', maxWidth: 40 },
  { id: 'race', label: 'Race', maxWidth: 40 },
  { id: 'gender', label: 'Gender', maxWidth: 40 },
  {
    id: 'strength',
    label: 'Strength',
    maxWidth: 20,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'power',
    label: 'Power',
    maxWidth: 20,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'int',
    label: 'Intelligence',
    maxWidth: 20,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'speed',
    label: 'Speed',
    maxWidth: 20,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];

const useStyles = makeStyles({
  root: {
    width: '179%',
  },
  tableWrapper: {
    maxHeight: 800,
    overflow: 'auto',
  },
});

export default function DataTable({heroes}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }
  
  const rows = heroes ? heroes : [];

  function generateHeroes(){
    return (
    <TableBody>
    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map(column => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.id === "img" ? <img src={value} /> : (column.format && typeof value === 'number' ? column.format(value) : value)}
              </TableCell>
            );
          })}
        </TableRow>
      );
    })}
    </TableBody>)
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {generateHeroes()}
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}