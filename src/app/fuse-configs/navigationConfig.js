import { MaterialUIComponentsNavigation } from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import { authRoles } from 'app/auth';

const navigationConfig = [
    {
        'id': 'applications',
        'title': 'Menu',
        'type': 'group',
        'icon': 'apps',
        'children': [
            {
                'id': 'dashboards',
                'title': 'Dashboard',
                'type': 'item',
                'icon': 'dashboard',
                'url': '/apps/dashboards/project'
            },
            {
                'id': 'profile',
                'title': 'Profile',
                'type': 'item',
                'icon': 'account_box',
                'url': '/pages/profile'
            },
            {
                'id': 'cards',
                'title': 'Cards',
                'type': 'item',
                'icon': 'note',
                'url': '/apps/file-manager'
            },
            {
                'id': 'transactions',
                'title': 'Transactions',
                'type': 'item',
                'icon': 'receipt',
                'url': '/apps/academy/courses'
            },
            {
                'id': 'logout',
                'title': 'Logout',
                'type': 'item',
                'url': '/logout',
                'icon': 'exit_to_app'
            },
        ]
    }       
];

export default navigationConfig;
