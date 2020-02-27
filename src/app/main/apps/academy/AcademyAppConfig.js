import React from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

export const AcademyAppConfig = {
    settings: {
        layout: {}
    },
    auth: authRoles.admin,//['admin']
    routes: [
        {
            path: '/apps/academy/courses/:courseId/:courseHandle?',
            component: React.lazy(() => import('./course/Course'))
        },
        {
            path: '/apps/academy/courses',
            component: React.lazy(() => import('./courses/Courses'))
        },
        {
            path: '/apps/academy',
            component: () => <Redirect to="/apps/academy/courses" />
        }
    ]
};
