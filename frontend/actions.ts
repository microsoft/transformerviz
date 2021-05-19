import { makeGetCall, makePostCall } from "./api.ts";


function requestGenerateText() {
  return {
    type: "REQUEST_GENERATE_TEXT"
  }
}

function setGeneratedTextResults(generateTextResults) {
  return {
    type: "SET_GENERATED_TEXT_RESULTS",
    text_generation_results: generateTextResults
  }
}

function generateTextFailed(error) {
  return {
    type: "REQUEST_GENERATE_TEXT_FAILED",
    error: error
  }
}

function generateText(config) {
    return function(dispatch) {
        dispatch(requestGenerateText());
        makePostCall("api/v1/generate_text", config)
          .then(response => dispatch(setGeneratedTextResults(response.data.text_generation_results)))
          .catch(error => dispatch(generateTextFailed(error)));
    }
}



export {
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText,
};
