import React from 'react';
import config from './config';

export default function useDropdown() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [manufacturers, setManufacturers] = React.useState([]);

  React.useEffect(() => {
    fetch(config.API_URL + "manufacturer")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setManufacturers(
            result.map((m) => {
              m.open = false;
              return m;
            })
          );
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  return [error ,isLoaded, manufacturers];
}
