const initialState = [];

export default function sumReducer ( state = initialState, action ) {
    switch (action.type){
        case 'ADD_SUM_DATA':
            return action.payload;        
        case 'RM_SUM_DATA':
            return [];
        default:
            return state
    }
}