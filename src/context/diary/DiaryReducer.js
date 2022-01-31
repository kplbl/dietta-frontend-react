const diaryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DIARY':
            return {
                ...state,
                entries: action.payload,
                loading: false,
                error: null,
            };
        case 'SET_DATE':
            return {
                ...state,
                date: action.payload,
            };
        case 'DIARY_ERROR':
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

export default diaryReducer;
