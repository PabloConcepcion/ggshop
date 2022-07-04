import { Text } from "@nextui-org/react";
import React from "react";
import { createUseStyles } from "react-jss";

interface IBadgeProps {
    text: string;
    onClick: any;
}
export const Badge = (props: IBadgeProps) => {

    const styles = BadgeStyles();
    return <div className={styles.container}>
        <Text onClick={props.onClick} className={styles.badgeText}>
            {props.text}
        </Text>
    </div>
}
const BadgeStyles = createUseStyles({
    container: {
        // border: "solid 1px grey",
        borderRadius: 50,
        padding: "0px 10px",
        cursor: "pointer"
    },
    badgeText: {
        fontSize: 15,
        textTransform: "uppercase"
    }
})