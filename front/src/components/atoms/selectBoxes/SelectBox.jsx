import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { useState } from 'react';

export const SelectBox = (props) => {
  const [theme, setTheme] = useState();
  const handleChange = (e) => {
    setTheme(e.target.value);
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>テーマを選んでください</InputLabel>
        <Select
          displayEmpty
          onChange={handleChange}
          value={theme || ''}
        >
          <MenuItem value="" disabled></MenuItem>
          {
            props.themes.map((theme) => (
              <MenuItem value={theme.id} key={theme.id}>{theme.title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  )
};