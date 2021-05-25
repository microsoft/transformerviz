import React from "react";
import * as d3 from "d3";
import * as _ from "lodash"
import ReactDOM from "react-dom";
import AnalyzedText from "../models/AnalyzedText";
import PerspectiveScoresSpiderChart from "./PerspectiveScoresSpiderChart";
import { FiEdit } from "react-icons/fi";

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
      <div className="p-3" style={{boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.12)"}}>
        <h1 className="mb-4">Toxicity Analysis</h1>
        <div className="mb-4 text-2xl">
          <PerspectiveScoresSpiderChart
            scores={this.props.selectedText}
            axes={[
              ["Toxicity", "toxicity"],
              ["Severe Toxicity", "severeToxicity"],
              ["Identity Attack", "identityAttack"],
              ["Insult", "insult"],
              ["Profanity", "profanity"],
              ["Threat", "threat"],
              ["Sexually Explicit", "sexuallyExplicit"],
              ["Flirtation", "flirtation"]
            ]}
            colors={tabColors}
          />
        </div>
        {this.props.selectedText.map((item, index) => 
          <div className="flex items-stretch mb-4" style={{minHeight: "110px"}}>
            <div className="flex items-center flex-none px-1" style={{backgroundColor: tabColors[index % tabColors.length], color: "white", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex items-center flex-auto px-4" style={{backgroundColor: "#F3F6FD", fontSize: "18px", lineHeight: "27px"}}>
              {item.text}
            </div>
            <div className="flex items-center flex-none px-1" style={{backgroundColor: "#E1E6F0", color: "white", fontSize: "18px", lineHeight: "20px"}}>
              <FiEdit style={{color: "#167DF5"}}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TextGenerationResults;
