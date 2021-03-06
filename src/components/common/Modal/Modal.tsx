import { Modal, Text } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { createUseStyles } from "react-jss";


interface IModalProps {
    title: string;
    body: ReactNode;
    actions?: ReactNode;
    visible: boolean;
    onHide: any;
    className?: string;
    fullWidth?: boolean;
}

export const ModalComponent = (props: IModalProps) => {
    const styles = ModalStyle();
    const [visible, setVisible] = React.useState(null);

    const closeHandler = () => {
        setVisible(false);
        props.onHide(false);
    };
    return <Modal
        closeButton
        open={visible || props.visible}
        onClose={() => closeHandler()}
        className={styles.containerModal + " " + props.className || ""}
    >
        <Modal.Header>
            <Text b id="modal-title" size={20}>
                {props.title}
            </Text>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
            {props.body}
        </Modal.Body>
        <Modal.Footer>
            {props.actions && props.actions}
        </Modal.Footer>
    </Modal>

}




const ModalStyle = createUseStyles({
    containerModal: {
    },
    modalBody: {

    }
})









