import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText
} from './actions';
import TextGenerationControl from "./components/TextGenerationControl";
import TextGenerationResults from "./components/TextGenerationResults";
import TextDetailedAnalysis from "./components/TextDetailedAnalysis";
import AnalyzedText from "./models/AnalyzedText";

type ContainerProps = {
  analysisResults: AnalyzedText[],
  error: any,
  loading: any,
  requestGenerateText: Function,
  setGeneratedTextResults: Function,
  generateTextFailed: any,
  generateText: any
}

const Container: React.FunctionComponent<ContainerProps> = ({
  analysisResults,
  error,
  loading,
  requestGenerateText,
  setGeneratedTextResults,
  generateTextFailed,
  generateText
  }) => {
    const [selectedTextIds, setSelectedTextIds] = useState(new Array<number>());
    console.log("Container state: ", selectedTextIds)

    const onSelectTextId = (id: number) => {
      if (selectedTextIds.includes(id)) {
        console.log(`Deselecting ${id}`)
        // Deselect
        setSelectedTextIds(selectedTextIds.filter(item => item != id));
      } else {
        console.log(`Selecting ${id}`)
        // Add to selected ids
        setSelectedTextIds([...selectedTextIds, id]);
      }
    }

    const getDetailedAnalysisComponent = () => {
      if (selectedTextIds.length == 0) {
        return (<React.Fragment />);
      } else {
        return (
          <TextDetailedAnalysis
            selectedText={analysisResults.filter(item => selectedTextIds.includes(item.id))} />
        );
      }
    }

    return (
      <div className="m-4 font-sans">
        <TextGenerationControl generateText={generateText} />
        <div className="grid grid-cols-2 gap-4">
          <TextGenerationResults 
            analysisResults={analysisResults}
            loading={loading}
            error={error}
            onSelectTextId={onSelectTextId}
            selectedTextIds={selectedTextIds} />
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
