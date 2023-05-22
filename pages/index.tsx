import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import  Focus  from '../assets/WatchingYouEmoji.jpg'

const inter = Inter({ subsets: ['latin'] })

function random1thru10() : number {
  const randomNumber = (Math.floor(Math.random() * 91) + 10) / 10;
  return randomNumber;
}

const imageStyle = {
    borderRadius: '25%',
};

export default function Home() {
  return (
    <div>
      <div className={styles.mainBox}>
        <Image 
        src={Focus}
        style={imageStyle}
        className={styles.mainImage}
        alt="focus-emoji"
        />
        <h1>The Daily Rizzler: Is it a rizz or cat calling today?</h1>
        <button onClick={() => random1thru10()}>Test your rizz</button>
      </div>
      {/* <p>______ of people that have at least 0.1 rizz &#1F60E</p>  Will need to find out why its printing out weird and to use cookies and database to track number of entries  */}
    </div>
  )
}
