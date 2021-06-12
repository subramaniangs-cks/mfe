import React, {useRef, useEffect} from 'react';
import { mount as DashboardMount} from 'dashboard/lib';

export default () => {

    const ref = useRef(null);

    useEffect(() => {
        DashboardMount(ref.current)
    }, [])

    return <div ref={ref}></div>
}