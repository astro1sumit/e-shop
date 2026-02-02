import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const PriceFilter = ({ onChange }) => {
    const [range, setRange] = useState([10, 250]);

    const handleInput = (values) => {
        setRange(values);
        if (onChange) onChange(values);
    };

    return (
        <div className='flex flex-col mb-4'>
            <p className='text-[16px] text-black mt-5 mb-5 font-bold'>Price Range</p>
            <RangeSlider 
                className={'custom-range-slider'} 
                min={0} 
                max={500} 
                defaultValue={range} 
                onInput={handleInput} 
            />
            <div className='flex justify-between mt-4'>
                <div className='border rounded-lg p-2 text-sm'>Min: ${range[0]}</div>
                <div className='border rounded-lg p-2 text-sm'>Max: ${range[1]}</div>
            </div>
        </div>
    );
};

export default PriceFilter;