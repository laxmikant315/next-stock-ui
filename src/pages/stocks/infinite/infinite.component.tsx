import React, { Component } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import axios from 'axios';
;
const api = {
    baseUrl: 'https://api.soundcloud.com',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
};

class App extends Component {

  state:any
    constructor(props:any) {
        super(props);

        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextHref: null
        };
    }

    loadItems(page:any) {
        var self = this;

        var url = api.baseUrl + '/users/8665091/favorites';
        if(this.state.nextHref) {
            url = this.state.nextHref;
        }

        axios.get(url+`?client_id=${api.client_id}&linked_partitioning=1&page_size=10`)
            .then(x=>x.data).then((resp)=> {
                if(resp) {
                    var tracks = self.state.tracks;
                    resp.collection.map((track:any) => {
                        if(track.artwork_url == null) {
                            track.artwork_url = track.user.avatar_url;
                        }

                        tracks.push(track);
                    });

                    if(resp.next_href) {
                        self.setState({
                            tracks: tracks,
                            nextHref: resp.next_href
                        });
                    } else {
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }

    render() {
        const loader = <div className="loader">Loading ...</div>;

        let items :any= [];
        this.state.tracks.map((track:any, i:number) => {
            items.push(
                <div className="track" key={i}>
                    <a href={track.permalink_url} target="_blank">
                        <img src={track.artwork_url} width="150" height="150" />
                        <p className="title">{track.title}</p>
                    </a>
                </div>
            );
        });

        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>

                <div className="tracks">
                    {items}
                </div>
            </InfiniteScroll>
        );
    }
};

export default App