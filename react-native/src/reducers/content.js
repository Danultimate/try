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

      console.log('CONTENTS_REPLACE - reducer')

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        contents = action.data.map(item => ({
          id: item.id,
          handle: item.handle,
          description: item.description,
          descriptionHtml: item.descriptionHtml,
          updatedAt: item.updatedAt,
          title: item.title,
          image: item.image,
          refetchQuery: item.refetchQuery,
          type: item.type,
        }));
      }

      return {
        ...state,
        error: null,
        isLoading: false,
        contents,
      };
    }
    default:
      return state;
  }
}
