import React from "react";
import * as d3 from "d3";
import * as _ from "lodash"
import ReactDOM from "react-dom";
import AnalyzedText from "../models/AnalyzedText";
import {BiEdit} from "react-icons/bi";

type TextDetailedAnalysisProps = {
  selectedText: AnalyzedText[],
}

class TextGenerationResults extends React.Component<TextDetailedAnalysisProps, null> {

  constructor(props) {
    super(props);
  }

  render() {
    const tabColors = ["#FD8A40", "#60B877", "#F03C92", "#8B3CF0"];
    return (
      <div>
        <div className="mb-4 text-2xl">
          d3 SVG chart here
        </div>
        {this.props.selectedText.map((item, index) => 
          <div className="flex items-stretch mb-4" style={{height: "110px"}}>
            <div className="flex items-center flex-none px-1" style={{backgroundColor: tabColors[index % tabColors.length], color: "white", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex items-center flex-auto px-4" style={{backgroundColor: "#F3F6FD", fontSize: "18px", lineHeight: "27px"}}>
              {item.text}
            </div>
            <div className="flex items-center flex-none px-1" style={{backgroundColor: "#E1E6F0", color: "white", fontSize: "18px", lineHeight: "20px"}}>
              <BiEdit style={{color: "#167DF5"}}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TextGenerationResults;
