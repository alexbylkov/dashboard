const initialState = {
    itemList: [],
    loading: false,
    error: false,
    token: false,
    users: [],
    active: ''
}


const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'ADD_TOKEN':
            return {
                ...state,
                token: true
            };
        case 'API_LOADED':
            return {
                ...state,
                itemList: payload,
                loading: false,
                error: false
            };
        case 'API_REQUESTED':
            return {
                ...state,
                itemList: state.itemList,
                loading: true,
                error: false
            };
        case 'API_ERROR':
            return {
                ...state,
                itemList: state.itemList,
                loading: false,
                error: true
            };
        case 'ADD_USER':
            return {
                ...state,
                users: [    
                    payload,
                    ...state.users
                ]
            };
        case 'UPDATE_USERS':
            const itemIndexxx = state.users.findIndex(item => item.flag === false );
            return {
                ...state, 
                users: [
                    ...state.users.slice(0, itemIndexxx),
                    payload,
                    ...state.users.slice(itemIndexxx + 1)
                ]
            };
        case 'DELETE_USER':
            const itemIndex = state.users.findIndex(item => item.id === payload);
            return {
                ...state, 
                users: [
                    ...state.users.slice(0, itemIndex),
                    ...state.users.slice(itemIndex + 1)
                ]
            };
        case 'EDIT_USER':
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === payload) {
                        return {...item, flag: false}
                    } return {...item, flag: true};
                })
            };
        case 'ACTIVE_USER':
            return {
                ...state,
                active: payload
            };
        default:
            return state;
    }
}
export default reducer;