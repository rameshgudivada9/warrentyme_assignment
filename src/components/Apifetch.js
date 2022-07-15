import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./apifetch.css";

export const Apifetch = () => {
  const totalCount = 1001522;
  const PAGE_LIMIT = 10;

  const [contact, setContacts] = useState([]);

  const getUserCardlist = () => {
    let pageNo = Math.ceil(contact.length / PAGE_LIMIT) + 1;
    axios
      .get(
        `https://gnews.io/api/v4/top-headlines?token=9085e7acc6f554d87bb660bbe7670acb&page=${pageNo}&limit=${PAGE_LIMIT}`
      )
      .then((res) => {
        var apidata = res.data.articles;
        const mergeData = [...contact, ...apidata];
        console.log(apidata);
        setContacts(mergeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCardlist();
  }, []);

  const fetchMoreData = () => {
    if (contact.length < totalCount) {
      getUserCardlist();
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Fragment>
      <div className="container">
        <div className="Searchdiv-main">
          <div className="searchIcon"></div>
          <div className="searchinputdiv">
            <input
              className="searchInput"
              placeholder="Search for a contact"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <InfiniteScroll
            dataLength={contact.length}
            next={fetchMoreData}
            hasMore={contact.length < totalCount}
            loader={<h4>Loading...</h4>}
          >
            {contact &&
              contact.length > 0 &&
              contact
                .filter((ele) => {
                  if (searchTerm === "") {
                    return ele;
                  } else if (
                    ele.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return ele;
                  }
                })
                .map((ele) => {
                  return (
                    <Fragment>
                      <div className="sub" key={ele.id}>
                        <div className="usercard">
                          <img
                            src={ele.image}
                            alt="imagess"
                            className="imagesize"
                          />
                        </div>
                        <div className="content">
                          <div>
                            <h5>TITLE::{ele.title}</h5>
                          </div>
                          <div>
                            <a href={ele.url}>link</a>
                          </div>
                         
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
          </InfiniteScroll>
        </div>
      </div>
    </Fragment>
  );
};
