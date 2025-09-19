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
import VisibilityIcon from "@mui/icons-material/Visibility";
import StyledRating from "./StyledRating";
import EmptyTable from "./EmptyTable";
import { FragranceTableSkeleton } from "./FragranceTableSkeleton"; // Import the skeleton component
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../services/fragranceService";

// Row component for each fragrance
export function FragranceRow({ fragrance, onRequestDelete, onRequestFinish }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (id, name, action) => {
    if (action === "details") {
      navigate(`/dashboard/fragrance/${id}`);
    } else if (action === "delete") {
      onRequestDelete(id, name);
    } else if (action === "edit") {
      navigate(`/dashboard/test/${id}`, { state: { isEditing: true } });
    } else if (action === "finish") {
      onRequestFinish(id, name);
    } else if (action === "test") {
      navigate(`/dashboard/test/${id}`, {
        state: { isEditing: false },
      });
    }
  };

  return (
    <>
      {/* Main row */}
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
        }}
      >
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
              onClick={() =>
                handleClick(fragrance.id, fragrance.name, "delete")
              }
            >
              <DeleteIcon sx={{ color: "var(--color-red-700)" }} />
            </button>

            {/* For finished table only */}
            {fragrance.status === "finished" && (
              <button
                className="flex items-center gap-2 font-semibold hover:underline underline-offset-4 hover:cursor-pointer hover:scale-103 transition-transform"
                onClick={() =>
                  handleClick(fragrance.id, fragrance.name, "edit")
                }
              >
                <VisibilityIcon
                  fontSize="small"
                  sx={{ color: "var(--color-primary-900)" }}
                ></VisibilityIcon>
                View Test
              </button>
            )}
            <button
              className="flex items-center gap-2 font-semibold text-nowrap rounded-md p-2 shadow-xs border border-primary-100 hover:cursor-pointer hover:scale-102 transition-transform"
              onClick={() =>
                handleClick(fragrance.id, fragrance.name, "details")
              }
            >
              <InfoIcon
                fontSize="small"
                sx={{ color: "var(--color-primary-900)" }}
              />
              Fragrance Info
            </button>
            {fragrance.status === "bookmarked" && (
              <Button
                onClick={() =>
                  handleClick(fragrance.id, fragrance.name, "test")
                }
              >
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
                    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
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
                                <StyledRating
                                  readOnly={true}
                                  value={fragrance.rating}
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
                                    handleClick(
                                      fragrance.id,
                                      fragrance.name,
                                      "edit"
                                    )
                                  }
                                  className="flex gap-2 items-center font-semibold text-nowrap text-primary-900 transition hover:text-primary-950 hover:scale-103 hover:cursor-pointer hover:underline underline-offset-4"
                                >
                                  <EditIcon
                                    fontSize="small"
                                    sx={{ color: "var(--color-primary-900)" }}
                                  />
                                  Edit
                                </button>
                                <Button
                                  onClick={() =>
                                    handleClick(
                                      fragrance.id,
                                      fragrance.name,
                                      "finish"
                                    )
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
export function FragranceTable({
  title,
  data,
  onRequestDelete,
  onRequestFinish,
  loading,
}) {
  // If loading, render the skeleton table
  if (loading) {
    return (
      <FragranceTableSkeleton title={title} rows={7} />
    );
  }

  // If not loading and no data, show the empty table message
  if (!data || data.length === 0) {
    return (
      <EmptyTable
        title={`No ${title.toLowerCase()} fragrances`}
        message={`Add a fragrance to ${title.toLowerCase()} fragrances`}
      />
    );
  }

  // If not loading and data is present, render the actual table
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "var(--color-neutral-cool-100)" }}
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
            {data.map((info) => (
              <FragranceRow
                key={info.id}
                fragrance={info}
                onRequestDelete={onRequestDelete}
                onRequestFinish={onRequestFinish}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
