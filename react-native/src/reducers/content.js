import Store from '../store/contents';

export const initialState = Store;

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'RRODUCTS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        products: action.data,
      };
    }
    case 'CONTENTS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'CONTENTS_REPLACE': {
      let contents = [];
      // Pick out the props I need
      if (action.feed) {
        //&& typeof action.f === 'object'
        feed = action.feed.map((item, index) => ({
          type: item.type,
          content: item.content,
          date: item.date
        }));
      }
      return {
        ...state,
        error: null,
        loading: false,
        isLoading: false,
        feed,
        products: action.products,
        orders: action.orders,
        headerMessage: action.header_message,
      };
    }
    default:
      return state;
  }
}
