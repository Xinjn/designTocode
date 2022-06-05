import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import { Grounds } from '@ifeng/client_grounds';
import style from './index.css';
import { publicPath } from '@src/constants';
import { message } from '@src/components/ModalBox';
import styles from '@src/mobile/details/layout/component/Details/UserFun/Collect/index.css';
import collectTrue from '@src/mobile/details/layout/assets/collectTrue.png';
import collectFalse from '@src/mobile/details/layout/assets/collectFalse.png';

const collectedImg = 'https://x0.ifengimg.com/ucms/2022_18/F093515FD35B6913B098499BAC2E024CEE831252_size2_w72_h72.png';
const unCollectedImg =
    'https://x0.ifengimg.com/ucms/2022_18/4E267AEC993454F673126F9B6DF871BB80B1898E_size3_w72_h72.png';

const IndexCollect = props => {
    const { itemData } = props;

    const [isCollected, setIsCollected] = useState(false);

    useEffect(
        () => {
            judge();
        },
        [itemData],
    );

    const judge = () => {
        if (window.grounds) {
            const callBackName = `judgeCollect_${new Date().getTime()}`;

            window[callBackName] = res => {
                setIsCollected(res);
            };

            Grounds.isCollected({ documentId: itemData.base62Id }, callBackName);
        }
    };

    const toggleCollect = e => {
        e.stopPropagation();

        const option = {
            documentId: itemData.base62Id,
            title: itemData.title,
            thumbnail: itemData.posterUrl,
            url: `${publicPath}/details/${itemData.base62Id}?ref=&immersion=true`,
        };

        const cb = `toggleCollect_${new Date().getTime()}`;

        window[cb] = result => {
            if (result) {
                if (!isCollected) {
                    message({
                        content: (
                            <div className={styles.success}>
                                <div>
                                    <img src={collectTrue} alt="" />
                                </div>
                                <div className={styles.successText}>收藏成功</div>
                            </div>
                        ),
                    });
                } else {
                    message({
                        content: (
                            <div className={styles.success}>
                                <div>
                                    <img src={collectFalse} alt="" />
                                </div>
                                <div className={styles.successText}>取消收藏</div>
                            </div>
                        ),
                    });
                }
                judge();
            }
        };

        Grounds.collect(
            {
                documentId: option.documentId,
                title: option.title,
                thumbnail: option.thumbnail,
                source: '剧集',
                links: [
                    {
                        type: 'web',
                        url: option.url,
                    },
                ],
            },
            !isCollected,
            cb,
        );
    };

    return (
        <div className={`${style.collect} ${isCollected ? style.active : ''}`} onClick={toggleCollect}>
            <img src={isCollected ? collectedImg : unCollectedImg} alt="" />
        </div>
    );
};

IndexCollect.propTypes = {
    itemData: PropTypes.object,
};

export default errorBoundary(IndexCollect);
