import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './components/Dialog';
import Message from './components/Message';

export const dialog = props => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);

        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };

    ReactDOM.render(
        <Dialog {...props} onClose={onClose}>
            {props.content}
        </Dialog>,
        div,
    );
};

export const message = props => {
    const lastEle = document.getElementById('messageBox');

    if (lastEle) {
        lastEle.parentElement.removeChild(lastEle);
    }

    const div = document.createElement('div');

    div.setAttribute('id', 'messageBox');
    document.body.appendChild(div);

    const onClose = () => {
        if (div) {
            ReactDOM.unmountComponentAtNode(div);
            if (div.parentElement) div.parentElement.removeChild(div);
        }

        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };

    ReactDOM.render(
        <Message {...props} onClose={onClose}>
            {props.content}
        </Message>,
        div,
    );
};
