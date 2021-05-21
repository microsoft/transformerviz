import axios from 'axios';

var apiServiceEnvironment = window["API_SERVICE_ENVIRONMENT"];
var port = apiServiceEnvironment.port;

/*
if (window.location.port != "") {
  port = window.location.port;
}*/

var apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:${port}`;


function makeGetCall(endpoint: string) {
  return axios.get<any>(`${apiBaseUrl}/${endpoint}`);
}

function makePostCall(endpoint: string, payload: any) {
  return axios.post(`${apiBaseUrl}/${endpoint}`, payload);
}

export {
  apiBaseUrl,
  makeGetCall,
  makePostCall
};
