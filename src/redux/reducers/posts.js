export default function postsReducer ( state = [], action ) {
    switch (action.type){
        case 'SETPOSTS':
            return action.payload
        case 'ADDPOSTS':
            return state.concat(action.payload);        
        case 'DELETEPOSTS':
            return [];
        default:
            return state
    }
}