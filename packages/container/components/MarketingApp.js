import React, {useRef, useEffect} from 'react';
import { mount as MarketingMount} from 'marketing/lib';

export default () => {

    const ref = useRef(null);

    useEffect(() => {
        MarketingMount(ref.current)
    })

    return <div ref={ref}></div>
}