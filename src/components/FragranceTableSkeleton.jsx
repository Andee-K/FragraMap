import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";

export function FragranceTableSkeleton({ title, rows }) {
  // Determine the number of columns based on the title
  const columns = title === "Testing" ? 5 : 4;

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "var(--color-neutral-cool-100)" }}
      >
        <Table aria-label="fragrance table skeleton">
          {/* Table Headers */}
          <TableHead sx={{ backgroundColor: "var(--color-primary-900)" }}>
            <TableRow>
              {/* Conditional cell for "Testing" table */}
              {title === "Testing" && <TableCell />}
              <TableCell>
                <p className="font-semibold text-primary-50">Name</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-primary-50">Brand</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-nowrap text-primary-50">
                  Date Added
                </p>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body with Skeleton Rows */}
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}