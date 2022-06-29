import { Input } from "@nextui-org/react";
import React from "react";
import { createUseStyles } from "react-jss";



interface IInputProps {
    value: string;
    placeholder?: string;
    className?: string;
    label: string;
    rows?: number;
    changeEvent: (e: any) => void
}


export const InputCustom = (props: IInputProps) => {
    const styles = InputStyles();
    //Este Id será diferente cada vez que sea invocado
    const inputId = new Date().getTime();
    return <div className={props.className || '' + styles.container}>
        <label htmlFor={"inputId-" + inputId}>{props.label}</label>
        {
            props.rows && props.rows > 0 ? <textarea className={styles.input} rows={props.rows} value={props.value} onChange={props.changeEvent} id={"inputId-" + inputId} placeholder={props.placeholder || ''} /> :
                <Input className={styles.input} onChange={props.changeEvent} id={"inputId-" + inputId} value={props.value} type={"text"} placeholder={props.placeholder || ''} />
        }
    </div>

}


const InputStyles = createUseStyles({
    container: {
        fontFamily: "sans-serif"
    },
    input: {
        "& label": {
            width: "100%"
        }
    }
})