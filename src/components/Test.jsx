import React from "react";
import axios from 'axios'

function Test(props) {
    const [repos, setRepos] = React.useState([])

    function apiCall(){
        console.log("calling api using axios")
        axios({
            method: "get",
            url: `https://api.github.com/users/hgergergamid/repos`
        }).then(res => {
            setRepos(res.data)
        })
    }
    apiCall();
    console.log(repos)

    function renderRepo(repo){
        return(
            <h2 key={repo.id}>{repo.name}</h2>
        )
    }


  return (
    <div className="test">
      <p>testing</p>
      {repos.map(renderRepo)}
    </div>
  );
}

export default Test;


//start editing here 3