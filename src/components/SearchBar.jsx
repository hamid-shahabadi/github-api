import React from "react";

function SearchBar(props) {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    props.resetSearch();
    props.setUsername(event.target[0].value);
    props.setDisplayName(event.target[0].value);
    props.username && getRepos();
    props.setSelectedRepo("");
    setError(null);
  }

  async function getRepos() {
    setLoading(true);
    await fetch(`https://api.github.com/users/${props.username}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `Could not find "${props.username}". please try another user or organization`
          );
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        props.setReposResults(data);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        setError(error.message);
      });
  }

  return (
    <div className="search p-0">
      <form className="form" onSubmit={handleSubmit}>
        <input
          spellCheck="false"
          className="search-bar col-md-9 col-12 m-2 px-3"
          type="text"
          value={props.username}
          onChange={(event) => props.setUsername(event.target.value)}
        />

        <button className="btn btn-primary mx-2 ">Search</button>

        {/* prints error message if it could not fetch the specified user or org from the api*/}
        {error && !loading && props.displayName && (
          <p className="text-danger px-2">{error}</p>
        )}

        {/* user or organization exists, but does doesn't have any public repositories*/}
        {!error &&
          !loading &&
          !props.reposResults.length &&
          props.displayName && (
            <p className="text-info px-2">
              {props.displayName} does doesn't have any public repositories yet.
            </p>
          )}
      </form>
    </div>
  );
}

export default SearchBar;
