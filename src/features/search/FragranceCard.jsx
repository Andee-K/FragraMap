import React from "react";

const FragranceCard = ({ fragranceInfo }) => {
  const {
    Name,
    Brand,
    ["Image URL"]: ImgURL,
    Gender,
    Longevity,
    Sillage,
    ["Main Accords Percentage"]: Accords,
    Notes,
  } = fragranceInfo;

  return (
    <div className="fragrance-card-container">
      <div className="fragrance-header">
        <div className="header-left">
          <h3 className="fragrance-name">{Name}</h3>
          <h4 className="fragrance-brand">{Brand}</h4>
        </div>
        <div className="header-right">{Gender}</div>
      </div>

      <div className="img-container">
        <img src={ImgURL} alt={`${Name} by ${Brand} image`}></img>
      </div>

      <div className="main-accords-container">
        <ul>
          {Object.entries(Accords).map(([accord, percentage]) => (
            <li key={accord}>
              {accord}: {percentage}
            </li>
          ))}
        </ul>
      </div>

      <div className="fragrance-notes-container">
        <div className="notes-section">
          <h4>Fragrance Notes</h4>

          {/* Top Notes */}
          <div className="note-category">
            <h5 className="note-category-title top-notes">Top Notes</h5>
            <div className="notes-grid">
              {Notes.Top.map((note, index) => (
                <div key={index} className="note-item">
                  <img
                    src={note.imageUrl}
                    alt={note.name}
                    className="note-image"
                  />
                  <span className="note-name">{note.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Notes */}
          <div className="note-category">
            <h5 className="note-category-title middle-notes">Middle Notes</h5>
            <div className="notes-grid">
              {Notes.Middle.map((note, index) => (
                <div key={index} className="note-item">
                  <img
                    src={note.imageUrl}
                    alt={note.name}
                    className="note-image"
                  />
                  <span className="note-name">{note.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Base Notes */}
          <div className="note-category">
            <h5 className="note-category-title base-notes">Base Notes</h5>
            <div className="notes-grid">
              {Notes.Base.map((note, index) => (
                <div key={index} className="note-item">
                  <img
                    src={note.imageUrl}
                    alt={note.name}
                    className="note-image"
                  />
                  <span className="note-name">{note.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceCard;
