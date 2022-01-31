const foodReducer = (state, action) => {
    switch (action.type) {
        case 'GET_FOODS':
            return {
                ...state,
                foods: action.payload,
                loading: false,
                error: null,
            };
        case 'FOOD_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'CLEAR_LOADING':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default foodReducer;
