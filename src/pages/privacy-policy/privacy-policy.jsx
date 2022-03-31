import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import MundoImage from '../../assets/imgs/mundo.png';

export default function PrivacyPolicy() {
  const [t, i18n] = useTranslation('global');
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '900px',

            marginTop: 20,
            backgroundColor: '#ffffff',
          }}
        >
          <img style={{ width: 900 }} src={MundoImage}></img>
          <div style={{ padding: 20 }}>
            {' '}
            <Typography variant="h5">{t('privacy.title')}</Typography>
            <br />
            <Typography>{t('privacy.intro')}</Typography>
            <br />
            <br />
            <Typography variant="h6">{t('privacy.personal')}</Typography>
            <br />
            <Typography>{t('privacy.personal-text')}</Typography>
            <br />
            <br />
            <Typography variant="h6">{t('privacy.howeuse-title')}</Typography>
            <br />
            <Typography>
              {t('privacy.howeuse-text')}

              <li>{t('privacy.howeuse-1')}</li>
              <li>{t('privacy.howeuse-2')}</li>
              <li>{t('privacy.howeuse-3')}</li>
            </Typography>
            <br />
            <br />
            <Typography variant="h6">{t('privacy.contact-title')}</Typography>
            <br></br>
            <Typography>{t('privacy.contact-text')}</Typography>
          </div>
        </div>
      </div>
    </>
  );
}
