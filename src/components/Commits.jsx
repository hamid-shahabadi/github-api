import React from "react";
import "./Commits.css";

function Commits(props) {
  const [commits, setCommits] = React.useState([]);
  var listOfCommits = [];

  React.useEffect(() => {
    getCommits();
  });

  // get all the commits from the git api call
  async function getCommits() {
    await fetch(
      `https://api.github.com/repos/${props.username}/${props.selectedRepo}/commits`
    )
    .then((response) => {

      if (!response.ok) {
        if (response.status === 403) {
          throw Error(
            `error 403 - api call limit exceeded. please try again in a few minutes`
          );
        } else if (response.status === 404) {
          throw Error(
            `could not fetch commits for https://api.github.com/repos/${props.username}/${props.selectedRepo}`
          );
        } else {
          throw Error(`error - ${response.status}`);
        }
      }
      

      return response.json()
    })
      .then( data => setCommits(data)
      )
      .catch((error) => {
        console.log(error.message);
      });
  }

  // create the list of tiles with the commits author, date of the commit, and the commit message 
  if (Array.isArray(commits)) {
    listOfCommits = commits.slice(0,20).map((commit, index) => {
      var lastUpdated = new Date(commit.commit.author.date);
      var commitDate = lastUpdated.toString().slice(4, 21);
      return (
        <a
          href={commit.html_url}
          className="commit-tile border border-dark d-block m-2 p-2 rounded"
          key={index}
        >
          <h2 className="name">{commit.commit.author.name} </h2>
          <p className="lastUpdated">{commitDate}</p>
          <p className="message">{commit.commit.message}</p>
        </a>
      );
    });
  }

  return (
    <div className="commits p-0">
      <h2 className="p-2 my-2">Commits for {props.selectedRepo}</h2>
      {listOfCommits}
    </div>
  );
}

export default Commits;
