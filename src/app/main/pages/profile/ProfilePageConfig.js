import React from 'react';
import { authRoles } from 'app/auth';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,//['admin']
    routes: [
        {
            path: '/pages/profile',
            component: React.lazy(() => import('./ProfilePage'))
        }
    ]
};
