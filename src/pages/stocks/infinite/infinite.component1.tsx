import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import axios from "axios";

const api = {
  baseUrl: "https://api.soundcloud.com",
  client_id: "caf73ef1e709f839664ab82bef40fa96",
};

const App = () => {
  const [nextHref, setNextHref] = useState<string | null>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [hasMoreItems, setHasMoreItem] = useState<boolean>(true);
  const loadItems = (page: any) => {
    let url = api.baseUrl + "/users/8665091/favorites";
    if (nextHref) {
      url = nextHref;
    }

    axios
      .get(
        url + `?client_id=${api.client_id}&linked_partitioning=1&page_size=10`
      )
      .then((x) => x.data)
      .then((resp) => {
        if (resp) {
          let newTracks = [...tracks];
          resp.collection.map((track: any) => {
            if (track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
            }

            newTracks.push(track);
          });

          if (resp.next_href) {
            setTracks(newTracks);
            setNextHref(resp.next_href);
          } else {
            setHasMoreItem(false);
          }
        }
      });
  };

  const loader = <div className="loader">Loading ...</div>;
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadItems}
      hasMore={hasMoreItems}
      loader={loader}
    >
      <div className="tracks">
        {tracks &&
          tracks.map((track: any, i: number) => (
            <div className="track" key={i}>
              <a href={track.permalink_url} target="_blank">
                <img src={track.artwork_url} width="150" height="150" />
                <p className="title">{track.title}</p>
              </a>
            </div>
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default App;
