import { makeGetCall, makePostCall } from "./api";


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

function foldForm() {
  return {
    type: "FOLD_FORM"
  }
}

function selectText(id: number) {
  return {
    type: "SELECT_TEXT",
    id: id
  }
}

function setEditTextResults(id: number, text: string, analysis: any) {
  return {
    type: "EDIT_TEXT_SUCCEEDED",
    id: id,
    text: text,
    analysis: analysis
  }

}

function editTextFailed(error) {
  return {
    type: "EDIT_TEXT_FAILED",
    error: error
  }
}

function submitEditText(id: number, text: string) {
  return function(dispatch) {
    makePostCall("api/v1/analyze_text", {text: text})
      .then(response => dispatch(setEditTextResults(id, text, response.data.text_analysis_result)))
      .catch(error => dispatch(editTextFailed(error)));
  }
}

function deleteEditText(id: number) {
  return {
    type: "DELETE_EDIT_TEXT",
    id: id
  }
}


export {
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText,
  selectText,
  submitEditText,
  deleteEditText,
  foldForm,
};
