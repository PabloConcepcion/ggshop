import React from "react";


interface IInputProps {
    value: string;
    placeholder?: string;
    className?: string;
    label: string;
    changeEvent: (e: any) => void
}


export const InputCustom = (props: IInputProps) => {

    //Este Id será diferente cada vez que sea invocado
    const inputId = new Date().getTime();
    return <div className={props.className || ''}>
        <label htmlFor={"inputId-" + inputId}>{props.label}</label>
        <input onChange={props.changeEvent} id={"inputId-" + inputId} type={"text"} placeholder={props.placeholder || ''} />
    </div>

}

