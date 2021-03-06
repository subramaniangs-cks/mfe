import React, {useRef, useEffect} from 'react';
import { mount as MarketingMount} from 'marketing/lib';
import { useHistory } from 'react-router-dom';

export default () => {

    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = MarketingMount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathName}) => {
                const { pathname } = history.location;
                
                if(pathname !== nextPathName)
                    history.push(nextPathName)
            }
        })

        if(onParentNavigate){
            history.listen(onParentNavigate)
        }
    }, [])

    return <div ref={ref}></div>
}