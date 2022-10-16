import React from "react";
import "./SearchResults.css";

function SearchResults(props) {
  const [languages, setLanguages] = React.useState([]);
  var topLanguages = [];
  var LastUpdatedDate = new Date(props.lastUpdated);

  React.useEffect(() => {
    getLanguages();
  });

  // get the list of all the languages
  async function getLanguages() {
    await fetch(
      `https://api.github.com/repos/${props.username}/${props.repoName}/languages`
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            throw Error(
              `error 403 - api call limit exceeded. please try again in a few minutes`
            );
          } else if (response.status === 404) {
            throw Error(
              `Could not fetch the top langauges for https://api.github.com/repos/${props.username}/${props.repoName}/languages.`
            );
          } else {
            throw Error(`error - ${response.status}`);
          }
        }

        return response.json();
      })
      .then((data) => setLanguages(data))
      .catch((error) => {
        console.log(error);
      });
  }

  // get the top 3 languages
  var counter = 0;
  for (var property in languages) {
    if (counter < 3) {
      topLanguages.push(property);
    }
    counter++;
  }

  return (
    <div
      className="search-results m-2 p-2 border border-dark rounded"
      onClick={() => props.setSelectedRepo(props.repoName)}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h2 className="repoName">{props.repoName}</h2>
            <p className="lastUpdated">
              updated: {LastUpdatedDate.toString().slice(4, 21)}
            </p>
            <p className="C">{props.description}</p>
          </div>
          <div className="languages col-md-4">
            {topLanguages.map((lang) => (
              <span
                className="topLang m-2 p-2 rounded d-inline-block"
                key={lang}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
