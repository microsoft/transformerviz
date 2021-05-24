import React from "react";
import * as _ from "lodash"
import AnalyzedText from "../models/AnalyzedText";

type TextGenerationResultsProps = {
  analysisResults: AnalyzedText[],
  onSelectTextId: Function,
  selectedTextIds: number[],
  loading?: boolean,
  error?: any
}

class TextGenerationResults extends React.Component<TextGenerationResultsProps, null> {

  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.error != null) {
      return (
        <div>Error generating text.</div>
      );
    } else if (this.props.loading) {
      return (
        <div>Loading...</div>
      );
    } else if (this.props.analysisResults.length == 0) {
      return (
        <>
        </>
      );
    }

    return (
      <div>
        <h4 className="mb-4 text-2xl" style={{fontWeight: 600}}>Generated Results</h4>
        {this.props.analysisResults.map((item) => 
          <div className="flex items-stretch mb-4" style={{height: "110px", border: this.props.selectedTextIds.includes(item.id) ? "solid #167DF5 2px" : "none"}}>
            <div className="flex items-center flex-none px-1" style={{backgroundColor: "#8894B1", color: "white", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex-none" style={{width: "140px", border: "solid black 1px"}}>
              BAR CHART HERE
            </div>
            <button 
              className="flex items-center flex-auto text-left px-4"
              style={{backgroundColor: "#F3F6FD", fontSize: "18px", lineHeight: "27px"}}
              onClick={() => this.props.onSelectTextId(item.id)}
            >
              {item.text}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TextGenerationResults;
