export default function idListReducer ( state = [], action ) {
    switch (action.type){
        case 'SETLIST':
            return action.payload;        
        case 'DELETELIST':
            return 0;
        default:
            return state
    }
}