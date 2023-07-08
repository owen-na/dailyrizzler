import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Focus from '../assets/WatchingYouEmoji.jpg';

const inter = Inter({ subsets: ['latin'] });

function random1thru10(): number {
  const randomNumber: number = (Math.floor(Math.random() * 91) + 10) / 10;
  return randomNumber;
}

const imageStyle = {
  borderRadius: '25%',
};

export default function Home() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const handleClick = () => {
    const randNumber = random1thru10();
    setRandomNumber(randNumber);
    setShowNumber(true);
    setCountdown(getTimeRemainingUntilMidnight());
    localStorage.setItem('randomNumber', randNumber.toString());
  };

  const getTimeRemainingUntilMidnight = (): number => {
    const currentDate = new Date();
    const currentDayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
    return Math.floor((currentDayEnd.getTime() - currentDate.getTime()) / 1000);
  };

useEffect(() => {
  const storedRandomNumber = localStorage.getItem('randomNumber');
  if (storedRandomNumber) {
    setRandomNumber(Number(storedRandomNumber));
    setShowNumber(true);
    setCountdown(getTimeRemainingUntilMidnight());
  } else {
    setShowNumber(false);
  }
}, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown <= 0) {
      setShowNumber(false);
      setRandomNumber(null);
      localStorage.removeItem('randomNumber');
    }
  }, [countdown]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainBox}>
        <div className={styles.topbox}>
          <Image src={Focus} style={imageStyle} className={styles.mainImage} alt="focus-emoji" />
          <button className={styles.helpbutton}>?</button>
        </div>
        <h2>The Daily Rizzler: Is it a rizz or cat calling today?</h2>
        {showNumber ? (
          <>
            <p className={styles.randomNumber}>{randomNumber} / 10</p>
            <p>Go get&apos;em tiger! :)</p>
            <p>Countdown until midnight: {formatTime(countdown)}</p>
          </>
        ) : (
          <>
            {countdown > 0 ? (
              <>
              <p className={styles.randomNumber}>{randomNumber} / 10</p>
              <p>Countdown until midnight: {formatTime(countdown)}</p>
              </>
            ) : (
              <button onClick={handleClick}>Test your rizz</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}


      {/* <p>______ of people that have at least 0.1 rizz &#1F60E</p> */}
      {/* Will need to find out why it's printing out weird and use cookies and database to track the number of entries */}
