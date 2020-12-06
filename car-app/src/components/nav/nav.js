import './nav.scss';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import HomeIcon from '@material-ui/icons/Home';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import config from '../../config';
import { navigate } from '@reach/router';
const useStyles = makeStyles({
  root: {
    width: '100vw',
    background: '#383838'
  },
});

function Nav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [cart, setCart] = config.globalState.useGlobalState('cart');
  const [model, setModel] = config.globalState.useGlobalState('model');
  
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={() => navigate('/cart')} label={`Košarica - ${cart.items.length}`} icon={<ShoppingBasket />} />
      <BottomNavigationAction onClick={() => {setModel(null);navigate('/');}} label={`Home`} icon={<HomeIcon />} />
    </BottomNavigation>
  );
}
export default Nav;