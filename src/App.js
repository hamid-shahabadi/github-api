import "./App.css";
import React from "react";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import SearchBar from "./components/SearchBar";
import Commits from "./components/Commits";

function App() {
  const [username, setUsername] = React.useState("");
  const [reposResults, setReposResults] = React.useState([]);
  const [displayName, setDisplayName] = React.useState("");
  const [selectedRepo, setSelectedRepo] = React.useState("");

  let repos = [];
  if (Array.isArray(reposResults)) {
    repos = reposResults.map((repo) => (
      <SearchResults
        key={repo.name}
        username={username}
        repoName={repo.name}
        lastUpdated={repo.pushed_at}
        description={repo.description}
        setSelectedRepo={setSelectedRepo}
      />
    ));
  }

  // when the user clicks "home" in the bread crumbs it takes the user back to the starting page with nothing selected
  function toHome(){
    setUsername("")
    setDisplayName("")
    setSelectedRepo("")
    setReposResults([]) 
  }

  // when user clicks the user name in the bread crumbs of the repo commits page it will deselect 
  // the current repo and take them back to the search results for the selected user/organization
  function toSearchResults(){
    setSelectedRepo("")
  } 

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {/* header */}
          <Header />

          {/* search bar  */}
          <SearchBar
            setUsername={setUsername}
            setDisplayName={setDisplayName}
            username={username}
            setReposResults={setReposResults}
            setSelectedRepo={setSelectedRepo}
            resetSearch={toHome}
            reposResults ={reposResults}
            displayName = {displayName}
          />

          {/* bread crumbs */}
          <div className="breadCrumbs">
            {displayName && !selectedRepo && <p> <button className="btn p-0" onClick={toHome}>home</button> {">"} {displayName}</p>}
            {selectedRepo && <p> <button className="btn p-0" onClick={toHome}>home</button> {">"} <button className="btn p-0" onClick={toSearchResults}> {displayName} </button> {">"} {selectedRepo}</p>}
          </div>

          {/* search results  */}
          {displayName && !selectedRepo &&  reposResults.length > 0 && <h2> Repos for {displayName}</h2>}
          
          {!selectedRepo && repos}

          {/* repo commits */}
          {selectedRepo && (
            <Commits selectedRepo={selectedRepo} username={username} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
