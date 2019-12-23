
import Router from './Services/Router/Router.js';
import Store from './Services/Store/Store.js';
import BackendWorker from './Services/BackendWorker/BackendWorker.js';
import './app.css';


const router = new Router(document.getElementById('root'));

Store.dispatch('changeRoute', {userState:{authorized:false}});















