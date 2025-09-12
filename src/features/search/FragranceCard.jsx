import React from "react";

const FragranceCard = ({ fragranceInfo }) => {
  const {
    Name,
    Brand,
    ["Image URL"]: ImgURL,
    ["Image Fallbacks"]: ImgBackup,
    Gender,
    Longevity,
    Sillage,
    ["Main Accords Percentage"]: Accords,
    Notes,
  } = fragranceInfo;

  console.log(fragranceInfo);
  return (
    <div className="fragrance-card-container max-w-md border-2 rounded-md p-8">
      <div className="fragrance-header flex justify-between">
        <div className="header-left text-left">
          <h3 className="fragrance-name font-bold">{Name}</h3>
          <h4 className="fragrance-brand">{Brand}</h4>
        </div>
        <div className="header-right tag">{Gender}</div>
      </div>

      <div className="img-container flex justify-center my-8">
        <img
          src={ImgURL}
          alt={`${fragranceInfo.Name} by ${fragranceInfo.Brand} Image`}
          onError={(e) => {
            e.currentTarget.src =
              ImgBackup?.[0] || "/default-image.jpg";
          }}
        />
      </div>

      <div className="main-accords-container">
        <h4>Main Accords</h4>
        <ul>
          {Object.entries(Accords || {}).map(([accord, percentage]) => (
            <li key={accord}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{accord}</span>
                <span className="text-xs font-bold">{percentage}</span>
              </div>
              <div className="flex w-full h-4 overflow-hidden text-xs font-medium rounded-full flex-start bg-blue-gray-50">
                <div
                  className={`flex items-center justify-center h-full overflow-hidden text-white break-all bg-gray-900 rounded-full`}
                  style={{ width: percentage }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="fragrance-notes-container">
        <h4>Fragrance Notes</h4>
        <div className="notes-section flex flex-col gap-6">
          {/* Top Notes */}
          <div className="note-category">
            <h5 className="note-category-title top-notes text-left">
              Top Notes:
            </h5>
            <div className="notes-grid flex flex-wrap gap-2">
              {Notes.Top.map((note, index) => (
                <span key={index} className="note-name tag">
                  {note.name}
                </span>
              ))}
            </div>
          </div>

          {/* Middle Notes */}
          <div className="note-category">
            <h5 className="note-category-title middle-notes text-left">
              Middle Notes:
            </h5>
            <div className="notes-grid flex flex-wrap gap-2">
              {Notes.Middle.map((note, index) => (
                <div key={index} className="note-item">
                  <span className="note-name tag">{note.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Base Notes */}
          <div className="note-category">
            <h5 className="note-category-title base-notes text-left">
              Base Notes:
            </h5>
            <div className="notes-grid flex flex-wrap gap-2">
              {Notes.Base.map((note, index) => (
                <div key={index} className="note-item">
                  <span className="note-name tag">{note.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fragrance-longevity-container flex text-left">
        <h4 className="w-1/2">Longevity: {Longevity}</h4>
        <h4 className="w-1/2">Sillage: {Sillage}</h4>
      </div>
    </div>
  );
};

export default FragranceCard;
