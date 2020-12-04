import './nav.scss';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles({
  root: {
    width: '100vw',
  },
});

function Nav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} /> */}
      <BottomNavigationAction  label={'Košarica'} icon={<ShoppingBasket />} />
      {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
    </BottomNavigation>
  );
}
export default Nav;