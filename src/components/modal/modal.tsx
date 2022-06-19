import * as React from 'react';
import './modal.css';

interface IModalProps {
    children: any,
    title?: React.ReactElement,
    visible: boolean,
    onOk?: () => void,
    onCancel?: () => void,
    okText?: string,
    cancelText?: string,
}

export default function Modal(props: IModalProps) {
    const { title, visible = false, okText = '确定', cancelText = '取消', children, onOk, onCancel } = props;
    if (!visible) {
        return null;
    };

    return (
        <div>
            <div className="modal-mask" onClick={onCancel} />
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="modal-cancel-btn btn" onClick={onCancel}>{cancelText}</button>
                    <button className="modal-confirm-btn btn" onClick={onOk}>{okText}</button>
                </div>
            </div>
        </div>
    )
}
