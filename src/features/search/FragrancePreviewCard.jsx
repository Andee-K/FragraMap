import React from 'react'

const FragrancePreviewCard = ( { fragranceInfo: {Name, Brand, ["Image URL"]: ImgURL} } ) => {
  return (
    <div className="fragrance-preview-container">
        <h3 className="fragrance-name">{Name}</h3>
        <h4 className="fragrance-brand">{Brand}</h4>
        <img src={ImgURL} alt={`${Name} by ${Brand} Image`} />
        <button>Add to Collection</button>
    </div>
  )
}

export default FragrancePreviewCard