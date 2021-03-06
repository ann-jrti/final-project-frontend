import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

export default function ChangeLang() {
  let [lang, setLang] = React.useState('es');
  const [t, i18n] = useTranslation('global');
  const Inpuut = styled(InputLabel)`
    padding: 0;
    margin: 0;
  `;

  const handleChange = (event) => {
    setLang(event.target.value);
    lang === 'es' ? i18n.changeLanguage('en') : i18n.changeLanguage('es');
  };

  return (
    <Box mr={3} sx={{ minWidth: 80, color: 'white' }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{ color: 'white', height: '20px' }}
          id="demo-simple-select-label"
        ></InputLabel>
        <Select
          sx={{ color: '#8d99ae', border: '1px solid #8d99ae' }}
          z
          s
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Lang"
          onChange={handleChange}
        >
          <MenuItem value={'es'}>ES</MenuItem>
          <MenuItem value={'en'}>EN</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
