const addToken = () => {
    return {
        type: 'ADD_TOKEN'
    };
};

const apiLoaded = (newItemList) => {
    return {
        type: 'API_LOADED',
        payload: newItemList
    };
};

const addUser = (newItemList) => {
    return {
        type: 'ADD_USER',
        payload: newItemList
    };
};

const apiRequested = () => {
    return {
        type: 'API_REQUESTED'
    };
};

const apiError = () => {
    return {
        type: 'API_ERROR'
    };
};

const deleteUser = (id) => {
    return {
        type: 'DELETE_USER',
        payload: id
    };
};

const editUser = (id) => {
    return {
        type: 'EDIT_USER',
        payload: id
    };
};

const updateUsers = (newItemList) => {
    return {
        type: 'UPDATE_USERS',
        payload: newItemList
    };
};

const activeUser = (user) => {
    return {
        type: 'ACTIVE_USER',
        payload: user
    };
};

export {
    apiLoaded,
    apiRequested,
    apiError,
    addToken,
    addUser,
    deleteUser,
    editUser,
    updateUsers,
    activeUser
};