import React, { Component } from "react";
import NytDisplay from "./NytDisplay";

const baseURL: string =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const key: string = "lswA3k9VzcEp3vni70u293Hc62UxniGW";
let pageNumber: number;

type AcceptedProps = {};
type SearchState = {
  search: string;
  startDate?: string;
  endDate?: string;
  results: [];
};
export default class NytLegacy extends Component<AcceptedProps, SearchState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      search: "",
      startDate: "",
      endDate: "",
      results: [],
    };
  }

  componentDidMount() {
    // this.fetchResults();
    console.log("Mounted");
  }

  fetchResults = () => {
    let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${this.state.search}`;
    url = this.state.startDate
      ? url + `&begin_date=${this.state.startDate}`
      : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          results: data.response.docs,
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  handleSubmit = (event: any) => {
    event.preventDefault();
    pageNumber = 0;
    this.fetchResults();
  };
  changePageNumber = (event: any, direction: string) => {
    event.preventDefault();
    if (direction === "down") {
      if (pageNumber > 0) {
        pageNumber = pageNumber - 1;
        this.fetchResults();
      }
    }
    if (direction === "up") {
      if (pageNumber >= 0) {
        pageNumber = pageNumber + 1;
        this.fetchResults();
      }
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="controls">
          <h1>NY Times article search</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <span>Enter a single search term (required) : </span>
            <input
              type="text"
              name="search"
              onChange={(e) => this.setState({ search: e.target.value })}
              required
            />
            <br />
            <span>Enter a start date: </span>
            <input
              type="date"
              name="startDate"
              pattern="[0-9]{8}"
              onChange={(e) => this.setState({ startDate: e.target.value })}
            />
            <br />
            <span>Enter an end date: </span>
            <input
              type="date"
              name="endDate"
              pattern="[0-9] {8}"
              onChange={(e) => this.setState({ endDate: e.target.value })}
            />
            <br />
            <button className="submit">Submit search</button>
          </form>
          {this.state.results.length > 0 ? (
            <NytDisplay
              results={this.state.results}
              changePage={this.changePageNumber}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
