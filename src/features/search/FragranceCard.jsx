import React from "react";
import {
  getLongevityScale,
  getSillageScale,
} from "../../services/fragranceService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloudIcon from "@mui/icons-material/Cloud";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import StyledRating from "../../components/StyledRating";
import {
  getAccordColor,
  getNoteColor,
  getGenderColor,
} from "../../services/colors";

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
    Notes,
  } = fragranceInfo;

  const longevity = getLongevityScale(Longevity);
  const sillage = getSillageScale(Sillage);
  const genderColor = getGenderColor(Gender);
  const percentageMap = {
    "Dominant": 100,
    "Prominent": 75,
    "Moderate": 50,
    "Subtle": 25,
    "Trace": 5,
  }
  
  return (
    <div className="fragrance-card-container flex flex-col p-8 gap-8 sm:rounded-md m-auto bg-neutral-cool-100">
      <div className="fragrance-header flex justify-between">
        <div className="header-left text-left">
          <h3 className="fragrance-name text-xl font-semibold">{Name}</h3>
          <h4 className="fragrance-brand text-lg font-semibold text-neutral-cool-600">
            {Brand}
          </h4>
        </div>
        <div
          className={`header-right self-start font-semibold border-2 rounded-full py-0.5 px-3 ${genderColor}`}
        >
          {Gender}
        </div>
      </div>

      <div className="img-container flex justify-center">
        <img
          src={ImgURL}
          alt={`${fragranceInfo.Name} by ${fragranceInfo.Brand} Image`}
          className="w-full object-contain rounded-md aspect-square"
          onError={(e) => (e.currentTarget.src = ImgBackup[0])}
        />
      </div>

      <div className="main-accords-container">
        <h4 className="text-xl font-semibold mb-2">Main Accords</h4>
        <ul className="flex flex-col gap-3">
          {Accords.map((accord) => {
            const accordStrength = AccordsPercentage[accord];
            const percentage = percentageMap[accordStrength];
            const color = getAccordColor(accord);

            return (
              <li key={accord}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold">{accord}</span>
                  <span className="text-sm font-bold">{percentage} %</span>{" "}
                </div>
                <div className="flex w-full h-4 overflow-hidden text-xs font-medium rounded-full border-neutral-300 border shadow-xs">
                  <div
                    className={`h-full rounded-full ${color} shadow-sm`}
                    style={{
                      width: percentage + "%",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="fragrance-notes-container">
        <h4 className="text-xl font-semibold mb-2">Fragrance Notes</h4>
        <div className="notes-section flex flex-col gap-6">
          {/* Top Notes */}
          <div className="note-category">
            <h5 className="text-left text-md font-semibold mb-3">Top Notes</h5>
            <div className="notes-grid flex flex-wrap gap-3 gap-y-5">
              {Notes.Top.length > 0 ? (
                Notes.Top.map((note, index) => {
                  const color = getNoteColor(note.name);
                  return (
                    <span
                      key={index}
                      className={`note-name tag border ${color}`}
                    >
                      {note.name}
                    </span>
                  );
                })
              ) : (
                <div className="flex items-center gap-2 text-md font-md text-neutral-cool-600">
                  <DoDisturbAltIcon fontSize="small"></DoDisturbAltIcon>
                  No Notes Available
                </div>
              )}
            </div>
          </div>

          {/* Middle Notes */}
          <div className="note-category">
            <h5 className="text-left text-md font-semibold mb-3">
              Middle Notes
            </h5>
            <div className="notes-grid flex flex-wrap gap-3 gap-y-5">
              {Notes.Middle.length > 0 ? (
                Notes.Middle.map((note, index) => {
                  const color = getNoteColor(note.name);
                  return (
                    <span
                      key={index}
                      className={`note-name tag border ${color}`}
                    >
                      {note.name}
                    </span>
                  );
                })
              ) : (
                <div className="flex items-center gap-2 text-md font-md text-neutral-cool-600">
                  <DoDisturbAltIcon fontSize="small"></DoDisturbAltIcon>
                  No Notes Available
                </div>
              )}
            </div>
          </div>

          {/* Base Notes */}
          <div className="note-category">
            <h5 className="text-left text-md font-semibold mb-3">Base Notes</h5>
            <div className="notes-grid flex flex-wrap gap-3 gap-y-5">
              {Notes.Base.length > 0 ? (
                Notes.Base.map((note, index) => {
                  const color = getNoteColor(note.name);
                  return (
                    <span
                      key={index}
                      className={`note-name tag border ${color}`}
                    >
                      {note.name}
                    </span>
                  );
                })
              ) : (
                <div className="flex items-center gap-2 text-md font-md text-neutral-cool-600">
                  <DoDisturbAltIcon fontSize="small"></DoDisturbAltIcon>
                  No Notes Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fragrance-longevity-container flex justify-between items-center flex-wrap gap-4">
        <div className="longevity-header">
          <h4 className="text-md font-semibold">Longevity</h4>
          <p className="text-sm font-semibold text-neutral-cool-600">
            {longevity.label}
          </p>
        </div>

        <StyledRating
          value={longevity.rating}
          icon={<AccessTimeFilledIcon fontSize="inherit" />}
          emptyIcon={<AccessTimeIcon fontSize="inherit" />}
          readOnly={true}
        />
      </div>

      <div className="fragrance-sillage-container flex justify-between items-center flex-wrap gap-4">
        <div className="sillage-header">
          <h4 className="text-md font-semibold">Sillage</h4>
          <p className="text-sm font-semibold text-neutral-cool-600">
            {sillage.label}
          </p>
        </div>

        <StyledRating
          value={sillage.rating}
          icon={<CloudIcon fontSize="inherit" />}
          emptyIcon={<CloudQueueIcon fontSize="inherit" />}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default FragranceCard;
