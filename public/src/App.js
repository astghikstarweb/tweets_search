import React, {Component} from 'react';
import actions from './actions/twitter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tweetsSelector, hashTagsSelector} from './selectors/tweets';
import './css/App.css';

class App extends Component {
    componentDidMount() {
        const {actions} = this.props;
        if (!localStorage.getItem('twitter_access_token')) {
            actions.fetchAccessToken();
        }
    }

    search(e) {
        e.preventDefault();
        const {actions} = this.props;
        const access_token = localStorage.getItem('twitter_access_token');
        const search = this.refs.search.value;
        actions.searchTweets(access_token, search);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="navbar-form" role="search">
                        <div className="input-group add-on">
                            <input className="form-control" placeholder="Search tweets" name="search"
                                   ref="search" type="text"/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" onClick={this.search.bind(this)}>
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    {
                        this.props.hashTags.length > 0 ? (<div>
                            <h2 className="h2">Top 10 hashtags</h2>
                            {this.props.hashTags.map((hashTags, i) => {
                                return (
                                    <div key={i} className="col-sm-3 panel panel-default padding-10 margin-10">
                                        <span className="hashtag">#{hashTags.text}({hashTags.count})</span>
                                    </div>
                                )
                            })}
                        </div>)
                            : (<div></div> )
                    }
                </div>
                <div className="row">
                    {
                        this.props.tweets.length > 0 ?
                            (<div>
                                <h2 className="h2">Search results</h2>
                                { this.props.tweets.map((tweet, i) => {
                                    return (
                                        <div key={i} className="col-sm-3 panel panel-default padding-10 margin-10 grid-item">
                                            {tweet.text}
                                        </div>);
                                })}
                            </div>) : (<div></div> )
                    }
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state) => ({
    hashTags: hashTagsSelector(state),
    tweets: tweetsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

