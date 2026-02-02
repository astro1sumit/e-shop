import React, { useCallback, useState, useEffect } from 'react';

export const colorSelector = {
    "Purple":"#8434E1", "Black":"#252525", "White":"#FFFFFF", "Gray": "#808080",
    "Blue": "#0000FF", "Red": "#FF0000", "Orange": "#FFA500", "Navy": "#000080",
    "Grey": "#808080", "Yellow": "#FFFF00", "Pink": "#FFC0CB", "Green": "#008000"
};

const ColorsFilter = ({ colors, onChange }) => {
  const [appliedColors, setAppliedColors] = useState([]);

  const onClickDiv = useCallback((item) => {
    const nextColors = appliedColors.includes(item) 
      ? appliedColors.filter(color => color !== item)
      : [...appliedColors, item];
    
    setAppliedColors(nextColors);
    if (onChange) onChange(nextColors);
  }, [appliedColors, onChange]);

  return (
    <div className='flex flex-col mb-4'>
        <p className='text-[16px] text-black mt-5 mb-5 font-bold'>Colors</p>
        <div className='flex flex-wrap gap-2'>
            {colors?.map(item => (
                <div key={item} className='flex flex-col items-center cursor-pointer' onClick={() => onClickDiv(item)}>
                  <div 
                    className={`w-8 h-8 border rounded-full hover:scale-110 transition-transform ${appliedColors.includes(item) ? 'ring-2 ring-black' : ''}`} 
                    style={{ background: colorSelector[item] || '#ddd' }}
                  ></div>
                  <p className='text-[10px] mt-1' style={{ fontWeight: appliedColors.includes(item) ? 'bold' : 'normal' }}>{item}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ColorsFilter;