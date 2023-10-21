// make api calls
import axios from 'axios';

// pointing to backend routes
const url = 'http://localhost/5000/posts'; // all the posts in databases

export const fetchPosts = () => axios.get(url);