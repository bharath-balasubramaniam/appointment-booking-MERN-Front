import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { InfoButton } from "./InfoButton";
import "./infoModal.css";
//Table Header
const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "pic", label: "", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "email",
    label: "E-mail",
    minWidth: 170,
  },
  {
    id: "timeslot",
    label: "TimeSlot",
    minWidth: 170,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 130,
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];
// for the pagination Part !
let rows = [];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
export default function StickyHeadTable({ data }) {
  // console.log(data);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (rows.length === 0 || rows.length !== 1) {
    rows = data;
  }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
          <TableBody>
            {data?.map((row, index) => {
              let a = String(row.timeslot.fromTime).split("");
              let a1 = String(row.timeslot.toTime).split("");
              a.splice(-2, 0, ":");
              a1.splice(-2, 0, ":");
              let b = a.join("");
              let b1 = a1.join("");
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align={"right"}>
                    <img
                      src={row.user.pic}
                      alt="img"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "5%",
                      }}
                    />
                  </TableCell>
                  <TableCell align={"left"}>{row.user.name}</TableCell>
                  <TableCell align={"left"}>{row.user.email}</TableCell>
                  <TableCell align={"left"}>{`${b} to ${b1}`}</TableCell>
                  <TableCell align={"left"}>{row.timeslot.date}</TableCell>
                  <TableCell align={"left"}>{row.user.contact}</TableCell>
                  <TableCell align={"left"}>
                    <InfoButton info={row}>View</InfoButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
