import React, { memo } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

const SelectBox = memo(({ placeholder, option, options, setOption }) => {
  const onChange = (e) => {
    setOption(e.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>{placeholder}</InputLabel>
      <Select displayEmpty onChange={onChange} value={option || ''}>
        <MenuItem value="" disabled />
        {options.map((opt) => (
          <MenuItem value={opt} key={opt.id}>
            {opt.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default SelectBox;