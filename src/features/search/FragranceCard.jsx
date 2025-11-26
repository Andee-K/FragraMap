import React from "react";
import {
  getLongevityScale,
  getSillageScale,
} from "../../services/fragranceService";

import {
  getAccordColor,
  getNoteColor,
  getGenderColor,
} from "../../services/colors";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloudIcon from "@mui/icons-material/Cloud";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import StyledRating from "../../components/StyledRating";

const percentageMap = {
  Dominant: "100%",
  Prominent: "75%",
  Moderate: "50%",
  Subtle: "25%",
  Trace: "5%",
};

const safeArr = (val) => (Array.isArray(val) ? val : []);

const NotesList = ({ title, notes }) => {
  const list = safeArr(notes);

  return (
    <div className="note-category">
      <h5 className="text-left text-md font-semibold mb-3">{title}</h5>

      <div className="notes-grid flex flex-wrap gap-3 gap-y-5">
        {list.length > 0 ? (
          list.map((note, i) => (
            <span
              key={i}
              className={`note-name tag border ${getNoteColor(note.name)}`}
            >
              {note.name}
            </span>
          ))
        ) : (
          <div className="flex items-center gap-2 text-md text-neutral-cool-600">
            <DoDisturbAltIcon fontSize="small" />
            No Notes Available
          </div>
        )}
      </div>
    </div>
  );
};

// Issue with data inconsistency with API
// Sometimes, accord percentage is given as strings like "Dominant", "Prominent", etc.
// Other times, they are given as numbers like 100%, 75%, etc.
// This component handles both cases.
const AccordsList = ({ accords, accordsPercentage }) => {
  console.log("accordsPercentage:", accordsPercentage);
  console.log("accords:", accords);

  return (
    <ul className="flex flex-col gap-3">
      {accords.map((accord) => {
        const accordValue = accordsPercentage[accord];
        const percentage = percentageMap[accordValue] || accordValue;

        return (
          <li key={accord}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">{accord}</span>
              <span className="text-sm font-bold">{percentage}</span>
            </div>

            <div className="flex w-full h-4 overflow-hidden rounded-full border border-neutral-300 shadow-xs">
              <div
                className={`h-full rounded-full ${getAccordColor(
                  accord
                )} shadow-sm`}
                style={{ width: `${percentage}` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const FragranceCard = ({ fragranceInfo }) => {
  const {
    Name,
    Brand,
    ["Image URL"]: ImgURL,
    ["Image Fallbacks"]: ImgBackup,
    Gender,
    Longevity,
    Sillage,
    ["Main Accords"]: Accords,
    ["Main Accords Percentage"]: AccordsPercentage,
    Notes = {},
  } = fragranceInfo;

  const longevity = getLongevityScale(Longevity);
  const sillage = getSillageScale(Sillage);

  return (
    <div className="fragrance-card-container flex flex-col p-8 gap-8 sm:rounded-md m-auto bg-neutral-cool-100">
      {/* Header */}
      <div className="fragrance-header flex justify-between">
        <div className="header-left text-left">
          <h3 className="fragrance-name text-xl font-semibold">{Name}</h3>
          <h4 className="fragrance-brand text-lg font-semibold text-neutral-cool-600">
            {Brand}
          </h4>
        </div>

        <div
          className={`header-right self-start font-semibold border-2 rounded-full py-0.5 px-3 ${getGenderColor(
            Gender
          )}`}
        >
          {Gender}
        </div>
      </div>

      {/* Fragrance Image */}
      <div className="img-container flex justify-center">
        <img
          src={ImgURL}
          alt={`${Name} by ${Brand}`}
          className="w-full object-contain rounded-md aspect-square"
          onError={(e) => (e.currentTarget.src = ImgBackup?.[0] || "")}
        />
      </div>

      {/* Main Accords */}
      <div className="main-accords-container">
        <h4 className="text-xl font-semibold mb-2">Main Accords</h4>
        <AccordsList accords={Accords} accordsPercentage={AccordsPercentage} />
      </div>

      {/* Notes */}
      <div className="fragrance-notes-container">
        <h4 className="text-xl font-semibold mb-2">Fragrance Notes</h4>

        <div className="notes-section flex flex-col gap-6">
          <NotesList title="Top Notes" notes={Notes.Top} />
          <NotesList title="Middle Notes" notes={Notes.Middle} />
          <NotesList title="Base Notes" notes={Notes.Base} />
        </div>
      </div>

      {/* Longevity */}
      <div className="fragrance-longevity-container flex justify-between items-center flex-wrap gap-4">
        <div>
          <h4 className="text-md font-semibold">Longevity</h4>
          <p className="text-sm font-semibold text-neutral-cool-600">
            {longevity.label}
          </p>
        </div>

        <StyledRating
          value={longevity.rating}
          icon={<AccessTimeFilledIcon fontSize="inherit" />}
          emptyIcon={<AccessTimeIcon fontSize="inherit" />}
          readOnly
        />
      </div>

      {/* Sillage */}
      <div className="fragrance-sillage-container flex justify-between items-center flex-wrap gap-4">
        <div>
          <h4 className="text-md font-semibold">Sillage</h4>
          <p className="text-sm font-semibold text-neutral-cool-600">
            {sillage.label}
          </p>
        </div>

        <StyledRating
          value={sillage.rating}
          icon={<CloudIcon fontSize="inherit" />}
          emptyIcon={<CloudQueueIcon fontSize="inherit" />}
          readOnly
        />
      </div>
    </div>
  );
};

export default FragranceCard;
