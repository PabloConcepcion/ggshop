import React from "react";
import reportWebVitals from "../../../reportWebVitals";


interface IInputProps {
    value: string;
    placeholder?: string;
    className?: string;
    label: string;
    rows?: number;
    changeEvent: (e: any) => void
}


export const InputCustom = (props: IInputProps) => {
    //Este Id será diferente cada vez que sea invocado
    const inputId = new Date().getTime();
    return <div className={props.className || ''}>
        <label htmlFor={"inputId-" + inputId}>{props.label}</label>
        {
            props.rows && props.rows > 0 ? <textarea rows={props.rows} value={props.value} onChange={props.changeEvent} id={"inputId-" + inputId} placeholder={props.placeholder || ''} /> :
                <input onChange={props.changeEvent} id={"inputId-" + inputId} value={props.value} type={"text"} placeholder={props.placeholder || ''} />
        }
    </div>

}

