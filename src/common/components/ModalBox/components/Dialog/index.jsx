import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Dialog = ({
    children,
    maskClosable = true,
    onCancel = () => {},
    onOk = () => {},
    onClose = () => {},
    okText = 'OK',
    cancelText = 'Cancel',
}) => {

    useEffect(() => {
        if (document.body.style.position !== 'fixed') {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `${-scrollTop}px`;

            return () => {
                document.body.style.position = 'unset';
                document.body.style.width = 'unset';
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
            };
        }
    }, []);

    const close = () => {
        onClose();
    };

    const handleOk = () => {
        onOk();
        close();
    };

    const handleCancel = () => {
        onCancel();
        close();
    };

    const handleClose = () => {
        close();
    };

    return (
        <div className={styles.wrap}>
            <div
                className={styles.mask}
                onClick={() => {
                    if (maskClosable) {
                        handleClose();
                    }
                }}>
                <div
                    className={styles.modal}
                    onClick={e => {
                        e.stopPropagation();
                    }}>
                    <div className={styles.content}>{children}</div>
                    <div className={styles.footer}>
                        <div className={cx('footerBtn', 'cancelBtn')} onClick={handleCancel}>
                            {cancelText}
                        </div>
                        <div className={cx('footerBtn', 'okBtn')} onClick={handleOk}>
                            {okText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Dialog.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    maskClosable: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
};

export default errorBoundary(Dialog);
