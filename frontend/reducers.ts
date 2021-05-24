import AnalyzedText from "./models/AnalyzedText"

const rawInitialState = {
   analysisResults: [],
   error: null,
   loading: false
}

const initialState = window["APP_STATE"] || rawInitialState;

function rootReducer(state = initialState, action) {

    switch(action.type) {
        case "REQUEST_GENERATE_TEXT":
          return Object.assign({}, state, {loading: true, error: null});

        case "REQUEST_GENERATE_TEXT_FAILED":
          return Object.assign({}, state, {loding: false, error: action.error});

        case "SET_GENERATED_TEXT_RESULTS":
          const analysisResults = action.text_generation_results?.map((result, index) => new AnalyzedText(result, index+1));
          return Object.assign({}, state, {loading: false, analysisResults: analysisResults, error: null});

        default:
            return state
    }
}

export default rootReducer;
