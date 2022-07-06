import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss"
import { Link } from "react-router-dom";
import langEn from "../../assets/en-lang.png";
import langEs from "../../assets/es-lang.png";

export const Navigation = () => {
    const styles = NavigationStyle();
    const [lang, setLang] = useState(i18next.language);

    const changeLanguage = (lang: string) => {
        i18next.changeLanguage(lang);
        setLang(lang);
    }
    useEffect(() => {
        setLang(i18next.language)
    }, []);

    return <div className={styles.navigation}>

        <ul className={styles.link}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li className={`${styles.lang} ${lang === "en" ? styles.selLang : ""}`} onClick={() => changeLanguage("en")}>
                <img src={langEn} alt="language english" />

            </li>
            <li className={`${styles.lang} ${lang === "es" ? styles.selLang : ""}`} onClick={() => changeLanguage("es")} >
                <img src={langEs} alt="Idioma español"></img>
            </li>
        </ul>
    </div>

}

const NavigationStyle = createUseStyles({
    navigation: {

    },
    link: {
        display: "flex",
        gap: 10,
        justifyContent: "flex-end"
    },
    selLang: {
        backgroundColor: "lightgrey",
    },
    lang: {
        cursor: "pointer",
        padding: {
            left: 10,
            right: 10
        },
        borderRadius: 4
    }
})