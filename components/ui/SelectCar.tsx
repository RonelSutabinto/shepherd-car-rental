import React, { ChangeEvent, useState } from 'react';

interface SelectComponentProps {
  onOptionChange: (selectedOption: string) => void;
  selectedOption: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ onOptionChange, selectedOption }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onOptionChange(e.target.value);
  };
  return (
    <div>
      <label>Car Made:</label>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="Ford">Ford</option>
        <option value="Honda">Honda</option>
        <option value="Hyundai">Hyundai</option>
        <option value="BMW">BMW</option>
        <option value="Toyota">Toyota</option>
        <option value="Mazda">Mazda</option>
        <option value="Kia">Kia</option>
        <option value="Nissan">Nissan</option>
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};
