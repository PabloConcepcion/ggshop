import React from 'react';
import { createUseStyles } from 'react-jss';
import background from "../assets/img/ggshopwallpaper.jpg";

export const Home = () => {
    const styles = HomeStyles();

    return <div className={styles.container} />
}

const HomeStyles = createUseStyles({
    container: {
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
    }
  });