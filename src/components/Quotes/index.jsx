import React, { useEffect, useState } from "react";

import { getApiInstance, getRandomNumber } from "../../helpers";
import { RefreshIcon, RightArrowIcon } from "../../icons";
import styles from "./quote-styles.module.css";

const Quotes = () => {
  const [listOfQuotes, setListOfQuotes] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [isGenerateAllQuotes, setIsGenerateAllQuotes] = useState(false);

  const fetchQuoteApi = async () => {
    try {
      const res = await getApiInstance("https://api.quotable.io/quotes");
      setListOfQuotes(res.results);
    } catch (err) {
      console.error(err);
      setListOfQuotes([]);
    }
  };

  useEffect(() => {
    if (isGenerateAllQuotes) return;
    fetchQuoteApi();
    setRandomNumber(getRandomNumber(listOfQuotes.length - 1));
  }, [isGenerateAllQuotes, listOfQuotes.length]);

  const refreshRandomNumber = () => {
    const newRandomNumber = getRandomNumber(listOfQuotes.length - 1);
    setRandomNumber(newRandomNumber);
  };

  const handleGenerateAllQuotes = async () => {
    setIsGenerateAllQuotes(true);
    setListOfQuotes([]);

    // Yogi Berra
    try {
      const { author } = listOfQuotes[randomNumber];
      const res = await getApiInstance(
        `https://api.quotable.io/quotes?author=${author
          .trim()
          .split(" ")
          .join("%20")}`
      );
      setListOfQuotes(res.results);
    } catch (err) {
      console.error(err);
      setListOfQuotes([]);
    }
  };

  if (isGenerateAllQuotes) {
    return !listOfQuotes.length ? (
      <div>Loading</div>
    ) : (
      <div className={styles.quoteContainer2}>
        <div className={styles.quoteAuthor2}>{listOfQuotes[0].author}</div>
        {listOfQuotes.map((quote) => (
          <div key={quote._id} className={styles.quoteContent}>
            "{quote.content}"
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.quoteContainer}>
      {!!listOfQuotes.length ? (
        <>
          <button
            className={styles.buttonRefresh}
            onClick={refreshRandomNumber}
          >
            <span>random</span> <RefreshIcon width={14} height={14} />
          </button>
          <div
            key={listOfQuotes[randomNumber]._id}
            className={styles.quoteContent}
          >
            "{listOfQuotes[randomNumber].content}"
          </div>
          <div
            className={styles.quoteAuthorContainer}
            onClick={handleGenerateAllQuotes}
          >
            <div>
              <div className={styles.quoteAuthor}>
                {listOfQuotes[randomNumber].author}
              </div>
              <div className={styles.quoteTags}>
                {listOfQuotes[randomNumber].tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </div>
            <RightArrowIcon width={14} height={14} fill="#fff" />
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Quotes;
