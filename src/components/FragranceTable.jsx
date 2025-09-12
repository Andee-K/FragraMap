import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../services/fragranceService";
import { useFragranceActions } from "../hooks/useFragranceActions";
import { useAuth } from "../context/AuthContext";

// Row component for each fragrance
export function FragranceRow({ fragrance }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { testFragrance, deleteFragrance, finishFragrance } =
    useFragranceActions(user.uid);

  const handleClick = (id, action) => {
    if (action === "details") {
      navigate(`/dashboard/fragrance/${id}`);
    } else if (action === "delete") {
      deleteFragrance(id);
    } else if (action === "edit") {
      navigate(`/dashboard/test/${id}`);
    } else if (action === "finish") {
      finishFragrance(id);
    } else if (action === "test") {
      testFragrance(fragrance);
      navigate(`/dashboard/test/${id}`);
    }
  };

  return (
    <>
      {/* Main row */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {fragrance.status === "testing" && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {fragrance.name}
        </TableCell>
        <TableCell>{fragrance.brand}</TableCell>
        <TableCell>{formatDate(fragrance.lastUpdated)}</TableCell>
        <TableCell>
          <Button onClick={() => handleClick(fragrance.id, "details")}>
            See Details
          </Button>
          <Button onClick={() => handleClick(fragrance.id, "delete")}>
            Delete
          </Button>
          {fragrance.status === "bookmarked" && (
            <Button onClick={() => handleClick(fragrance.id, "test")}>
              Start Testing
            </Button>
          )}
        </TableCell>
      </TableRow>

      {/* Expanded details row */}
      {fragrance.status === "testing" && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Test Details
                </Typography>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Test Date</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{formatDate(fragrance.testDate)}</TableCell>
                      <TableCell>
                        {fragrance.rating ? `${fragrance.rating}/5` : "-"}
                      </TableCell>
                      <TableCell>{fragrance.personalNotes || "-"}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleClick(fragrance.id, "edit")}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleClick(fragrance.id, "finish")}
                        >
                          Finish Testing
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

// FragranceTable component
export function FragranceTable({ title, data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="fragrance table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((f) => (
              <FragranceRow key={f.id} fragrance={f} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
