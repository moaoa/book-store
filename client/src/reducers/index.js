import {
    FETCH_SUCCESS,
    FETCH_FAILED,
    ADD_BOOK,
    DELETE_BOOK,
    EDIT_BOOK,
} from '../actions/constants'
const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                books: action.bayload,
                loading: false,
            }
        case FETCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case ADD_BOOK:
            return {
                ...state,
                books: [action.payload, ...state.books],
            }
        case EDIT_BOOK:
            const modefiedBooks = state.books.map((book) =>
                book.slug !== action.payload ? book : action.payload
            )
            return {
                ...state,
                books: modefiedBooks,
            }
    }
}
export default reducer
