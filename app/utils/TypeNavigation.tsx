import * as React from 'react';

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params: any) {
    if ( navigationRef.current != null ) {
        navigationRef.current.navigate(name, params);
    }
}

export const getCurrentRoute = () => {
    return navigationRef.current.getCurrentRoute().name;
}