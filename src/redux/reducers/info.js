const initialState = 0;

export default function usedReducer ( state = initialState, action ) {
    switch (action.type){
        case 'SETCOUNTUSED':
            return action.payload;        
        case 'DELETECOUNTUSED':
            return 0;
        default:
            return state
    }
}

