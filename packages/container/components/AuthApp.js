import React, {useRef, useEffect} from 'react';
import { mount as AuthMount} from 'auth/lib';
import { useHistory } from 'react-router-dom';

export default ({onSignIn}) => {

    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = AuthMount(ref.current, {
            onAuthChange: () => {},
            onSignIn,
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