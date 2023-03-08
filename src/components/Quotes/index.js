import React, { useEffect, useState } from "react";

const Quotes = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const handleFetchApi = () => {
    fetch("https://api.quotable.io/quotes").then((res) =>
      res.json().then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    );
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  console.log(item);

  return <div>Quotes</div>;
};

export default Quotes;
