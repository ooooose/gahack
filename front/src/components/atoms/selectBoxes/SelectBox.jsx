import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

export const SelectBox = (props) => {
  const onChange = (e) => {
    props.setTheme(e.target.value);
  }
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>テーマを選んでください</InputLabel>
        <Select
          displayEmpty
          onChange={onChange}
          value={props.theme || ''}
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