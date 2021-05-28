import AnalyzedText from "./models/AnalyzedText";
import TextRecord from "./models/TextRecord";

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

        case "REQUEST_EDIT_TEXT": {
          const record: TextRecord = state.analysisResults.find(item => item.id === action.id);
          if (record) {
            record.editLoading = true;
          }
          return Object.assign({}, state, {analysisResults: [...state.analysisResults]});
        }

        case "REQUEST_GENERATE_TEXT_FAILED":
          return Object.assign({}, state, {loading: false, error: action.error});

        case "SET_GENERATED_TEXT_RESULTS": {
          const analysisResults = action.text_generation_results?.map((result) => new TextRecord(result));
          return Object.assign({}, state, {loading: false, analysisResults: analysisResults, error: null});
        }
        
        case "SELECT_TEXT": {
          const id = action.id;
          let textIds = state.selectedTextIds;
          if (state.selectedTextIds.includes(id)) {
            textIds = textIds.filter(item => item != id);
          } else {
            textIds = [...textIds, id];
          }
          return Object.assign({}, state, {selectedTextIds: textIds});
        }
        
        case "EDIT_TEXT_SUCCEEDED": {
          const record: TextRecord = state.analysisResults.find(item => item.id === action.id);
          if (record) {
            record.edited = new AnalyzedText({...action.analysis, text: action.text, id: action.id});
            record.editLoading = false;
          }
          return Object.assign({}, state, {analysisResults: [...state.analysisResults]});
        }
        
        case "EDIT_TEXT_FAILED": {
          console.log(action.error);
          const record: TextRecord = state.analysisResults.find(item => item.id === action.id);
          record.editLoading = false;
          record.edited = null;
          record.editError = action.error;
          return Object.assign({}, state, {analysisResults: [...state.analysisResults]});
        }

        case "DELETE_EDIT_TEXT": {
          const rec: TextRecord = state.analysisResults.find(item => item.id === action.id);
          if (rec) {
            rec.edited = null;
          }
          return Object.assign({}, state, {analysisResults: [...state.analysisResults]});
        }

        case "FOLD_FORM":
          return Object.assign({}, state, {isFolded: !state.isFolded});

        default:
            return state
    }
}

export default rootReducer;
