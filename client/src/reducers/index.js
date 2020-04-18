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
                books: action.payload,
                loading: false,
                error: '',
            }
        case FETCH_FAILED:
            return {
                books: [],
                loading: false,
                error: action.payload,
            }
        case ADD_BOOK:
            return {
                error: '',
                loading: false,
                books: [action.payload, state.books],
            }
        case EDIT_BOOK:
            const modefiedBooks = state.books.map((book) =>
                book.slug !== action.payload ? book : action.payload
            )
            return {
                loading: false,
                error: '',
                books: modefiedBooks,
            }
    }
}
export default reducer
