import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Row, TableProps } from "./DataTable.interface";

export const DataTable: FC<TableProps> = (props) => {
  const {
    headers,
    rows,
    // count = 0,
    // onPageChange = () => {},
    // onRowsPerPageChange,
    // page = 0,
    // rowsPerPage = 0,
  } = props;

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newSelecteds = event.target.checked ? rows.map((n) => n.id) : [];
      setSelectedItemIds(newSelecteds);
    },
    [rows]
  );

  const handleRowCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, rowId: string) => {
      if (event.target.checked) {
        setSelectedItemIds((prev) => [...prev, rowId]);
      } else {
        setSelectedItemIds((prev) => prev.filter((id) => id !== rowId));
      }
    },
    []
  );

  const renderCell = (row: Row, cell: keyof Row, cellIndex: number) => {
    switch (cell) {
      case "userName":
      case "email":
        return <TableCell key={cellIndex}>{row[cell]}</TableCell>;
      case "isVerified":
        return (
          <TableCell key={cellIndex}>
            {row[cell] ? (
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                Yes
              </Typography>
            ) : (
              <Typography color="error" sx={{ fontWeight: "bold" }}>
                No
              </Typography>
            )}
          </TableCell>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedItemIds.length === rows.length}
                  color="primary"
                  indeterminate={
                    selectedItemIds.length > 0 &&
                    selectedItemIds.length < rows.length
                  }
                  onChange={handleCheckboxChange}
                />
              </TableCell>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
              return (
                <TableRow key={rowIndex}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItemIds.indexOf(row.id) !== -1}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleRowCheckboxChange(event, row.id)
                      }
                    />
                  </TableCell>
                  {Object.keys(row).map((cell, cellIndex) =>
                    renderCell(row, cell as keyof Row, cellIndex)
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};
