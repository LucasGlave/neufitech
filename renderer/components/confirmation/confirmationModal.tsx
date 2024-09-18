import React from "react";
import ReactDOM from "react-dom";
import Confirmation from "../Confirmation";

interface ConfirmationModalProps {
    question: string;
    resolve: (value: boolean) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ question, resolve }) => {
    const handleConfirm = () => resolve(true);
    const handleCancel = () => resolve(false);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <Confirmation
                question={question}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>,
        document.body
    );
};

export default ConfirmationModal;
