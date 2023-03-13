const { nanoid } = require('nanoid');
const notes = require('./notes');

const addhandlerNotes = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createAt = new Date().toDateString();
    const updatedAt = createAt;
    const newNote = {
        title,
        tags,
        body,
        id,
        createAt,
        updatedAt,
    };

    notes.push(newNote);

    const isSucces = notes.filter((note) => note.id === id).length > 0;
    if (isSucces) {
        const response = h.response({
            status: 'success',
            message: 'Catatab berhasil ditambahkan',
            data: {
                noteID: id,
            },
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        mesasage: 'catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getallNotes = () => ({
    status: 'succes',
    data: {
        notes,
    },
});

const getnoteByid = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: `succes`,
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        mesasage: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNotesbyID = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toDateString();
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'succces',
            message: 'data berhasil diperbarui',
        });
        response.code(200);
        return response;
    };
    const response = h.response({
        status: 'fail',
        message: 'id tidak ditemukan, dan gagal memberbarui',
    });
    response.code(404);
    return response;
};

const deletedNotesbyID = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'succces',
            message: 'Data berhasil deleted',
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'hapus gagal id tidak ditemukan',
    });
    response.code(404);
    return response;
};


module.exports = {
    addhandlerNotes,
    getallNotes,
    getnoteByid,
    editNotesbyID,
    deletedNotesbyID,
};