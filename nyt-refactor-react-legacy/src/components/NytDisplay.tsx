import React, { FunctionComponent } from "react";

type AcceptedProps = {
  results: [];
  changePage: any;
};
// interface Results {y


const NytDisplay: FunctionComponent<AcceptedProps> = (props) => {
  return (
    <div>
        <div className="buttons">
          <button className="prev" onClick={(e) => props.changePage(e, "down")}>
            Previous 10
          </button>
          <button className="next" onClick={(e) => props.changePage(e, "up")}>
            Next 10
          </button>
          <br />
        </div>
      <div>
        {props.results.map((result:any) => {
          return (
            <div key={result._id}>
              <h2>{result.headline.main}</h2>
              {result.multimedia.length > 1 ? (
                <img
                  alt="article"
                  src={`http://www.nytimes.com/${result.multimedia[10].url}`}
                />
              ) : (
                ""
              )}
              <p>
                {result.snippet}
                <br />
                {result.keywords.length > 0 ? " Keywords: " : ""}
              </p>
              <ul>
                {result.keywords.map((keyword: any) => (
                  <li key={keyword.value}>{keyword.value}</li>
                ))}
              </ul>
              <a href={result.web_url}>
                <button className="read">Read It</button>
              </a>
            </div>
          );
        })}
       <div className="buttons">
          <button className="prev" onClick={(e) => props.changePage(e, "down")}>
            Previous 10
          </button>
          <button className="next" onClick={(e) => props.changePage(e, "up")}>
            Next 10
          </button>
        </div>
      </div>
    </div>
  );
};
export default NytDisplay;
