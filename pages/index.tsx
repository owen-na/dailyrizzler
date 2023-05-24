import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Focus from '../assets/WatchingYouEmoji.jpg';

const inter = Inter({ subsets: ['latin'] });

function random1thru10() : number {
  const randomNumber : number = (Math.floor(Math.random() * 91) + 10) / 10;
  return randomNumber;
}

const imageStyle = {
  borderRadius: '25%',
};

export default function Home() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [lastClickedTimestamp, setLastClickedTimestamp] = useState<number | null>(null);

  const handleClick = () => {
    const randNumber = random1thru10();
    setRandomNumber(randNumber);
    setShowNumber(true);
    setLastClickedTimestamp(Date.now());
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    const timeUntilNextDay = currentDayEnd.getTime() - currentDate.getTime();

    if (lastClickedTimestamp !== null) {
      const elapsedTime = Date.now() - lastClickedTimestamp;
      if (elapsedTime >= timeUntilNextDay) {
        setShowNumber(false);
        setRandomNumber(null);
      }
    }
  }, [lastClickedTimestamp]);

  return (
    <div className={styles.main}>
      <div className={styles.mainBox}>
        <div className={styles.topbox}>
        <Image
          src={Focus}
          style={imageStyle}
          className={styles.mainImage}
          alt="focus-emoji"
        />
        <button className={styles.helpbutton}>?</button>
        </div>
        <h2>The Daily Rizzler: Is it a rizz or cat calling today?</h2>
        {showNumber ? (
          <>
          <p className={styles.randomNumber}>{randomNumber} / 10</p>
          <p>Go get'em tiger! :)</p>
          </>
        ) : (
          <button onClick={handleClick}>Test your rizz</button>
        )}
      </div>
      {/* <p>______ of people that have at least 0.1 rizz &#1F60E</p> */}
      {/* Will need to find out why it's printing out weird and use cookies and database to track the number of entries */}
    </div>
  );
}
