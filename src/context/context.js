import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const getUserUrl = (user) => `${rootUrl}/users/${user}`;
const getReposUrl = (user) => `${rootUrl}/users/${user}/repos?per_page=100`;
const getFollowersUrl = (user) => `${rootUrl}/users/${user}/followers`;
const limitUrl = `${rootUrl}/rate_limit`;

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  useEffect(() => {
    axios
      .get(limitUrl)
      .then((res) => {
        if (res.data.rate.remaining === 0)
          setError({
            show: true,
            msg:
              'Your IP address has used all available requests to Github API. Please try again later',
          });
        setRequests({
          remaining: res.data.rate.remaining,
          limit: res.data.rate.limit,
        });
      })
      .catch();
  }, []);

  const searchUser = async (user) => {
    setIsLoading(true);
    setError({show:false,msg:''});
    const sources = [limitUrl, getReposUrl(user), getFollowersUrl(user)];

    let response = await axios(getUserUrl(user)).catch(err=>console.log(err));
 
    if (response) {
     setGithubUser(response.data)
      const tasks = sources.map(axios.get);
      await Promise.allSettled(tasks).then((results) => {
        const [requests,repos, followers] = results;
        console.log(repos);
        if(requests.status==='fulfilled')
        setRequests({
            remaining: requests.value.data.rate.remaining,
            limit: requests.value.data.rate.limit,
          });
        if(repos.status=='fulfilled')
        setRepos(repos.value.data);
        if(followers.status=='fulfilled')
        setFollowers(followers.value.data)
      }).catch(err=>setError({show:true,msg:'unable to fetch followers and repos'}));

      setIsLoading(false);
    } else {console.log('error getting user');setError({ show: true, msg: 'Unable to load user profile' });}
  };

  const [error, setError] = useState({ show: false, msg: '' });
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState({ remaining: 0, limit: 60 });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, requests, searchUser, error }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
