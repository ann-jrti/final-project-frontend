import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ChangeLang() {
    let [lang, setLang] = React.useState('es');
    const [t, i18n] = useTranslation('global');

    const handleChange = (event) => {
        setLang(event.target.value);
        lang === 'es' ? i18n.changeLanguage('en') : i18n.changeLanguage('es');
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t('header.lang')}</InputLabel>
                <Select
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

    )
}