import React from 'react'

import jwtDecode from 'jwt-decode'
import * as browserUtils from '../../utils/browserUtils.ts'
import * as utils from '../utils/utils.ts'

interface PermitRouteProps {
    path: string | string[],
    component: React.FunctionComponent,
    fallback: React.FunctionComponent,
    exact?: boolean,
    isAllow: (user: User) => boolean,
}

export default function PermitRoute({
    component: Component, fallback: Fallback, isAllow
}: PermitRouteProps) {

    const token = browserUtils.getCookie('access_token');
    if (token) {
        const user = jwtDecode(token);
        return isAllow(user) ? <Component /> : <Fallback />;
    }
    else {
        globalThis.location.replace('/');
        return <Fallback />;
    }
}