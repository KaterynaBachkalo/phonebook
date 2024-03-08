export const brandColor = 'rgb(25,118,210)';

export const brandColorShadow = 'rgba(25,118,210,0.26)';

export const secondBrandColor = '#FFBE1B';

export const hoverFocusStyles = {
  '&:hover': {
    color: '#FFBE1B',
    transition: 'all linear 250ms',
  },
  '&:focus': {
    color: '#FFBE1B',
    transition: 'all linear 250ms',
  },
};

export const linkStylesNav = {
  display: { xs: 'none', md: 'flex' },

  fontSize: '24px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  color: '#fff',
  '&.active-link': {
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid #fff',
  },
  ...hoverFocusStyles,
};

export const formStyles = {
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  padding: '40px 15px ',
  gap: '10px',
  border: `1px solid ${brandColor}`,
  borderRadius: '10px',
  boxShadow: `0px 1px 19px 8px ${brandColorShadow}`,
};
