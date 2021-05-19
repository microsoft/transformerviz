import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText
} from './actions.ts';
import TextGenerationControl from "./components/TextGenerationControl.tsx";
import TextGenerationResults from "./components/TextGenerationResults.tsx";


function Container({
  text_generation_results,
  error,
  loading,
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText
  }) {

    return (
      <div className="container">
        <TextGenerationControl generateText={generateText} />
        <TextGenerationResults generatedResults={text_generation_results} loading={loading} error={error} />
      </div>
    );
}

function mapStateToProps (state) {
  return {
    text_generation_results: state.text_generation_results,
    error: state.error,
    loading: state.loading,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    requestGenerateText: requestGenerateText,
    setGeneratedTextResults: setGeneratedTextResults,
    generateTextFailed: generateTextFailed,
    generateText: generateText
  }, dispatch);
 }

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default MainContainer;
