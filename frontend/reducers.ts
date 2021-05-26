import AnalyzedText from "./models/AnalyzedText";

const rawInitialState = {
   analysisResults: [],
   selectedTextIds: [],
   error: null,
   loading: false,
   isFolded: false
}

const initialState = window["APP_STATE"] || rawInitialState;

function rootReducer(state = initialState, action) {

    switch(action.type) {
        case "REQUEST_GENERATE_TEXT":
          return Object.assign({}, state, {loading: true, error: null, analysisResults: [], selectedTextIds: []});

        case "REQUEST_GENERATE_TEXT_FAILED":
          return Object.assign({}, state, {loding: false, error: action.error});

        case "SET_GENERATED_TEXT_RESULTS":
          const analysisResults = action.text_generation_results?.map((result) => new AnalyzedText(result));
          return Object.assign({}, state, {loading: false, analysisResults: analysisResults, error: null});
        
        case "SELECT_TEXT":
          const id = action.id;
          let textIds = state.selectedTextIds;
          if (state.selectedTextIds.includes(id)) {
            textIds = textIds.filter(item => item != id);
          } else {
            textIds = [...textIds, id];
          }
          return Object.assign({}, state, {selectedTextIds: textIds});
        
        case "FOLD_FORM":
          return Object.assign({}, state, {isFolded: !state.isFolded});

        default:
            return state
    }
}

export default rootReducer;
