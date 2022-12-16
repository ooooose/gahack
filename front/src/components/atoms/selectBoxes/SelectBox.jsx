import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

export const SelectBox = ({placeholder, option, options, setOption}) => {
  const onChange = (e) => {
    setOption(e.target.value);
  }
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>{placeholder}</InputLabel>
        <Select
          displayEmpty
          onChange={onChange}
          value={option || ''}
        >
          <MenuItem value="" disabled></MenuItem>
          {
            options.map((opt) => (
              <MenuItem value={opt} key={opt}>{opt.title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  )
};