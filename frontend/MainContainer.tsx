// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText,
  selectText,
  submitEditText,
  deleteEditText,
  foldForm
} from './actions';
import TextGenerationControl from "./components/TextGenerationControl";
import TextGenerationResults from "./components/TextGenerationResults";
import TextDetailedAnalysis from "./components/TextDetailedAnalysis";
import TextRecord from "./models/TextRecord";

type ContainerProps = {
  analysisResults: TextRecord[],
  error: any,
  loading: any,
  isFolded: boolean,
  selectedTextIds: Array<number>,
  requestGenerateText: Function,
  setGeneratedTextResults: Function,
  generateTextFailed: any,
  generateText: any
  selectText: Function,
  submitEditText: Function,
  deleteEditText: Function,
  foldForm: Function,
}

const Container: React.FunctionComponent<ContainerProps> = ({
  analysisResults,
  error,
  loading,
  isFolded,
  selectedTextIds,
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText,
  selectText,
  submitEditText,
  deleteEditText,
  foldForm
  }) => {
    const getDetailedAnalysisComponent = () => {
      if (selectedTextIds.length == 0) {
        return (<React.Fragment />);
      } else {
        const selectedText = selectedTextIds.map(id => analysisResults.find(item => id == item.id))
        return (
          <TextDetailedAnalysis
            selectedText={selectedText} 
            submitEditText={submitEditText} 
            deleteEditText={deleteEditText} 
            />
        );
      }
    }

    useEffect(() => {
      const form = document.getElementById("text_gen_form");
      const grid = document.getElementById("two_column_grid");
      if (grid) {
        grid.style.height = `calc(93.5vh - ${form?.offsetHeight}px)`
      }
    })

    return (
      <div className="m-4 font-sans">
        <TextGenerationControl generateText={generateText} onFold={() => foldForm()} isFolded={isFolded} />
        <div id="two_column_grid" className="two-column-grid gap-4">
          <TextGenerationResults 
            analysisResults={analysisResults}
            loading={loading}
            error={error}
            onSelectTextId={selectText}
            selectedTextIds={selectedTextIds}
          />
          {getDetailedAnalysisComponent()}
        </div>
      </div>
    );
}

function mapStateToProps (state) {
  return {
    analysisResults: state.analysisResults,
    error: state.error,
    loading: state.loading,
    selectedTextIds: state.selectedTextIds,
    isFolded: state.isFolded
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    requestGenerateText: requestGenerateText,
    setGeneratedTextResults: setGeneratedTextResults,
    generateTextFailed: generateTextFailed,
    generateText: generateText,
    selectText: selectText,
    submitEditText: submitEditText,
    deleteEditText: deleteEditText,
    foldForm: foldForm,
  }, dispatch);
 }

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default MainContainer;
