import types from './types';
import axios from 'axios';
import api from './api';

const fetchAccessToken = () => {
    return (dispatch) => {
        axios.get(api.GET_ACCESS_TOKEN).then((res) => {
            localStorage.setItem('twitter_access_token', res.data.access_token);
            dispatch({type: types.FETCH_TWITTER_ACCESS_TOKEN, payload: res})
        }).catch((error) => {
            dispatch({type: types.FETCH_TWITTER_ACCESS_TOKEN_FAIL, payload: error})
        })
    };
};

const searchTweets = (access_token, search) => {
    return (dispatch) => {
        axios.get(api.SEARCH + '?q=' + search, { headers: { access_token:  access_token } }).then((res) => {
            dispatch({type: types.FETCH_SEARCH_TWEETS, payload: res})
        }).catch((error) => {
            dispatch({type: types.FETCH_SEARCH_TWEETS_FAIL, payload: error})
        })
    };
};

export default {fetchAccessToken, searchTweets}
