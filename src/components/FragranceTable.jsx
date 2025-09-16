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
import { motion, AnimatePresence } from "framer-motion";

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
      // setIsConfirmOpen(true);
      // deleteFragrance(id);
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
        {/* Test Details Toggle */}
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

        {/* Individual Fragrance Details */}
        <TableCell component="th" scope="row">
          <p className="font-semibold">{fragrance.name}</p>
        </TableCell>
        <TableCell>{fragrance.brand}</TableCell>
        <TableCell>{formatDate(fragrance.lastUpdated)}</TableCell>
        {/* CTA Buttons */}
        <TableCell>
          <div className="flex items-center gap-4 justify-end">
            <button
              className="hover:cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleClick(fragrance.id, "delete")}
            >
              <DeleteIcon sx={{ color: "var(--color-danger)" }} />
            </button>
            <button
              className="flex items-center gap-2 font-semibold text-nowrap rounded-md p-2 shadow-sm border-primary-50 hover:cursor-pointer hover:scale-102 transition-transform"
              onClick={() => handleClick(fragrance.id, "details")}
            >
              <InfoIcon
                fontSize="small"
                sx={{ color: "var(--color-primary-900)" }}
              />
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
          <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="expanded-details"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Box sx={{ margin: 1 }}>
                      <Table size="small" aria-label="details">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <p className="text-nowrap font-semibold">
                                Test Date
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="text-nowrap font-semibold">
                                Rating
                              </p>
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
                              <div className="flex gap-6 justify-end">
                                <button
                                  onClick={() =>
                                    handleClick(fragrance.id, "edit")
                                  }
                                  className="flex gap-2 items-center font-semibold text-nowrap text-primary-900 hover:cursor-pointer hover:underline"
                                >
                                  <EditIcon
                                    fontSize="small"
                                    sx={{ color: "var(--color-primary-900)" }}
                                  />
                                  Edit
                                </button>
                                <Button
                                  onClick={() =>
                                    handleClick(fragrance.id, "finish")
                                  }
                                >
                                  Finish Testing
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
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
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "var(--color-neutral-cool-50)" }}
      >
        <Table aria-label="fragrance table">
          <TableHead sx={{ backgroundColor: "var(--color-primary-900)" }}>
            <TableRow>
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
