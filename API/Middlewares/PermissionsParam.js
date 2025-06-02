// TODO Finir les rôles et leurs droit

const permissions = {
    admin: 'all',
    user: {
        '/roles': {
            'GET': true,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/users': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/logout': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/refreshToken': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/login': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        }
    },
    guest: {
        '/roles': {
            'GET': true,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/users': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/logout': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/refreshToken': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/login': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        }
    }
};

export default permissions;