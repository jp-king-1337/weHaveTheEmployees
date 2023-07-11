function fetchDepartmentsFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM departments";

        connection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function fetchRolesFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM roles";

        connection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function fetchManagersFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM managers";

        connection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = {
    fetchDepartmentsFromDatabase,
    fetchRolesFromDatabase,
    fetchManagersFromDatabase
};