const {
    addhandlerNotes,
    getallNotes,
    getnoteByid,
    editNotesbyID,
    deletedNotesbyID,
} = require('./handler');

const routes = [{
        method: `POST`,
        path: `/notes`,
        handler: addhandlerNotes,
    },
    {
        method: `GET`,
        path: `/notes`,
        handler: getallNotes,
    },
    {
        method: `GET`,
        path: `/notes/{id}`,
        handler: getnoteByid,
    },
    {
        method: `PUT`,
        path: `/notes/{id}`,
        handler: editNotesbyID,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deletedNotesbyID,
    },
];

module.exports = routes;