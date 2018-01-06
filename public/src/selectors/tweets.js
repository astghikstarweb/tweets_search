import {createSelector} from 'reselect';

export const tweetsSelector = state => {
    return state.twitter.tweets ? state.twitter.tweets.statuses : []
};

export const hashTagsSelector = createSelector(
    tweetsSelector,
    (items) => {
        let hashTags = {};
        items.forEach((item) => {
            item.entities.hashtags.forEach((hashTag) => {
                const tagText = hashTag.text.toLowerCase();
                if (hashTags[tagText]) {
                    hashTags[tagText]++;
                } else {
                    hashTags[tagText] = 1;
                }
            })
        })
        const keys = Object.keys(hashTags);
        const values = Object.values(hashTags);
        let hashTagsDataArr = [];
        for (let i = 0; i< keys.length; i++) {
            hashTagsDataArr.push({text: keys[i], count: values[i]})
        }
        hashTagsDataArr.sort((a, b) => {
            if (a.count < b.count) {
                return 1;
            }
            if (a.count > b.count) {
                return -1;
            }
        });
        return hashTagsDataArr.slice(0, 10);
    });



