const initialState = 0;

export default function limitReducer ( state = initialState, action ) {
    switch (action.type){
        case 'SETCOUNTLIMIT':
            return action.payload;        
        case 'DELETECOUNTLIMIT':
            return 0;
        default:
            return state
    }
}