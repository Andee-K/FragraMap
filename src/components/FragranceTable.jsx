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
  Paper,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import InfoIcon from "@mui/icons-material/Info";
import Button from "./Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Rating from "@mui/material/Rating";

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
        {fragrance.status === "testing" && (
          <TableCell>
            <div className="flex items-center gap-2">
              <p className="text-nowrap font-semibold">Test Details</p>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </div>
          </TableCell>
        )}

        <TableCell component="th" scope="row">
          {fragrance.name}
        </TableCell>
        <TableCell>{fragrance.brand}</TableCell>
        <TableCell>{formatDate(fragrance.lastUpdated)}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3 justify-end">
            <button
              className="hover:cursor-pointer"
              onClick={() => handleClick(fragrance.id, "delete")}
            >
              <DeleteIcon />
            </button>
            <button
              className="flex items-center gap-2 font-semibold text-nowrap border-1 rounded-md px-2 py-1.5 hover:cursor-pointer"
              onClick={() => handleClick(fragrance.id, "details")}
            >
              <InfoIcon fontSize="small" />
              Fragrance Info
            </button>
            {fragrance.status === "bookmarked" && (
              <Button onClick={() => handleClick(fragrance.id, "test")}>
                Start Testing
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>

      {/* Expanded details row */}
      {fragrance.status === "testing" && (
        <TableRow>
          <TableCell colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <p className="text-nowrap font-semibold">Test Date</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-nowrap font-semibold">Rating</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-nowrap font-semibold">Notes</p>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <p className="text-nowrap">
                          {formatDate(fragrance.testDate)}
                        </p>
                      </TableCell>
                      <TableCell>
                        {fragrance.rating ? (
                          <Rating
                            name="read-only"
                            value={fragrance.rating}
                            readOnly
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: 250,
                          maxWidth: 500,
                          whiteSpace: "normal",
                        }}
                      >
                        {fragrance.personalNotes || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() => handleClick(fragrance.id, "edit")}
                            className="flex gap-2 items-center font-semibold text-nowrap hover:cursor-pointer hover:underline"
                          >
                            <EditIcon fontSize="small" /> Edit
                          </button>
                          <Button
                            onClick={() => handleClick(fragrance.id, "finish")}
                          >
                            Finish Testing
                          </Button>
                        </div>
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
    <Box>
      <div className="hidden xl:block">
        <h3 className="text-xl font-medium">{title}</h3>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="fragrance table">
          <TableHead>
            <TableRow>
              {title === "Testing" && <TableCell />}
              <TableCell>
                <p className="font-semibold">Name</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">Brand</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-nowrap">Date Added</p>
              </TableCell>
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
