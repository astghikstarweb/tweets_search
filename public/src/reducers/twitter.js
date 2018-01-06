import types from '../actions/types'

const twitter = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_TWITTER_ACCESS_TOKEN: {
            return {...state, twitterAccessToken: action.payload.data}
            break;
        }

        case types.FETCH_TWITTER_ACCESS_TOKEN_FAIL: {
            return {...state, error: action.payload.data}
            break;
        }
        case types.FETCH_SEARCH_TWEETS: {
            return {...state, tweets: action.payload.data}
            break;
        }

        case types.FETCH_SEARCH_TWEETS_FAIL: {
            return {...state, error: action.payload.data}
            break;
        }
        default:
            return state;
    }
};

export default twitter;