import React from "react";
import "./part.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import config from "../../config";
import { navigate } from "@reach/router";
import { useEffect } from 'react';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "80rem",
    margin: "0 auto",
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
  fullDetails: {
    padding: "0.5rem 2rem 1rem 0",
  },
  link: {
    textDecoration: "none",
  },
});

export function Part(props) {
  if (props.vehicle) {
    return (
      <>
        <div className="component-part">
          <div className="h1-wrap">
            <h1 className="component-title">{`${props.vehicle.manuf.label} ${props.vehicle.model.label} parts`}</h1>
          </div>
          <PartView parts={props.vehicle.model.parts} />
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

function PartView(props) {
  return props.parts.length ? (
    props.parts.map(item => {
      return (
        <div key={item.pkPart} className="item-list">
          <Item part={item} />
        </div>
      );
    })
  ) : (
      <div className="item-list">No items to show!</div>
    );
}

export function Item(props) {
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [apiPart, setapiPart] = React.useState();
  const [selectedModel, setSelectedModel] = config.globalState.useGlobalState('model');
  const [selectedCart, setSelectedCart] = config.globalState.useGlobalState('cart');



  const partSelect = () => {
    navigate(`/${props.part.pkPart}`);
  };

  useEffect(() => {
    if (props.routePkPart) {
      fetch(config.API_URL + "part/" + props.routePkPart)
        .then(res => res.json())
        .then(
          result => {
            setIsLoaded(true);
            setapiPart(result);
          },
          error => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [props.routePkPart]);

  console.log(props);
  if (props.routePkPart === undefined) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.part.label}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.part.details}
          </Typography>
          <Typography className={classes.fullDetails} variant="body2" component="p">
            {props.part.fullDetails}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={partSelect} size="small">
            Learn More
					</Button>
        </CardActions>
      </Card>
    );
  } else {
    const addToCart = () => {
      setSelectedModel(null);
      let items = [...config.globalState.getGlobalState('cart').items, apiPart];
      setSelectedCart({ items: items, open: items.length? true: false });
      
      navigate('/');
    };

    if (error) {
      return <></>;
    } else if (!isLoaded) {
      return <></>;
    } else {
      if (apiPart) {
        return (
          <div className="item-part-api">
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {apiPart.label}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {apiPart.details}
                </Typography>
                <Typography className={classes.fullDetails} variant="body2" component="p">
                  {apiPart.fullDetails}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={addToCart} size="small">
                  Add to cart
							</Button>
              </CardActions>
            </Card>
          </div>
        );
      } else {
        return <></>;
      }
    }
  }
}

export default Part;
