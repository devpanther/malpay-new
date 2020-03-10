import React from 'react';
import { authRoles } from 'app/auth';

export const FileManagerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,//['admin']
    routes  : [
        {
            path     : '/apps/file-manager',
            component: React.lazy(() => import('./FileManagerApp'))
        }
    ]
};
