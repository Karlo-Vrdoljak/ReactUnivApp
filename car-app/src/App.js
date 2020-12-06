import React from "react";
import "./App.css";
import PropTypes from 'prop-types';
import config from "./config";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import useDropdown from "./useDropdown.hook.js";
import { Part, Item } from "./components/part/part";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";


import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import Cart from "./components/cart/cart";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  flex: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: "2rem",
  },
}));



function App() {
  const classes = useStyles();
  const [selectedModel, setSelectedModel] = config.globalState.useGlobalState('model');
  const [error, isLoaded, manufacturers] = useDropdown();

  const [cart, setCart] = config.globalState.useGlobalState('cart');

  console.log("cart", cart);
  
  const handleClose = () => {
    let newState = config.jsonCopy(cart);
    newState.open = false;
    setCart(newState);
  };


  console.log("GLOBAL", config.globalState.getGlobalState('cart'));
  function handleSelectedModel(model) {
    console.log(model);
    setSelectedModel(model);
  }

  if (error) {
    return (
      <div className={classes.flex}>
        <div className={classes.item}> Error: {error.message}</div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className={classes.flex}>
        <div className={classes.item}> Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="App-header">
          {selectedModel == null ? (
            <>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Select a manufacturer
									</ListSubheader>
                }
                className={classes.root}
              >
                {manufacturers.map(m => (
                  <Manufacturer listener={model => handleSelectedModel(model)} value={m} manuf={m} pkManufacturer={m.pkManufacturer} key={m.pkManufacturer} label={m.label} />
                ))}
              </List>
            </>
          ) : (
              <></>
            )}
          <Router>
            <Part path="/" vehicle={selectedModel} />
            <Item path="/:routePkPart" />
            <Cart path="/cart" />
          </Router>
          {cart.open ? <CartDialog open={cart.open} onClose={handleClose} />: <></>}
        </div>
      </div>
    );
  }
}

function Manufacturer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [model, setModel] = React.useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleManufacturer = () => {
    fetch(config.API_URL + "manufacturer/" + props.pkManufacturer)
      .then(res => res.json())
      .then(
        result => {
          setModel((result && result.models) || []);
        },
        error => { }
      );
  };
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.label} />
        {props.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} onEnter={handleManufacturer} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {model &&
            model.map(ml => {
              return (
                <ListItem key={ml.pkModel} onClick={() => props.listener({ model: ml, manuf: props.manuf })} button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={ml.label} />
                </ListItem>
              );
            })}
        </List>
      </Collapse>
    </>
  );
}

function CartDialog(props) {
  // const classes = useStyles();
  const { onClose, open } = props;

  const closeDialog = () => {
    onClose(false);
  };

  return (
    <Dialog onClose={closeDialog} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">We have noticed you added an item to your cart</DialogTitle>
      <DialogContent>
        <div>
          <div>
            <Typography variant="body1" gutterBottom>
              Do you wish to take a look at your cart now?
            </Typography>
          </div>
          <div className="flex-dialog-footer">
            <Button onClick={closeDialog} variant="outlined">No thanks</Button>
            <Button onClick={() => navigate('/cart').then(() => closeDialog())} variant="contained" color="primary">sure!</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// CartDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

export default App;
