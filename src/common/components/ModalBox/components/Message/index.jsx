import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

const Message = ({ children, onClose = () => {}, delay = 2000 }) => {
    const close = () => {
        onClose();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            close();
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

Message.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onClose: PropTypes.func,
    delay: PropTypes.number,
};

export default errorBoundary(Message);
