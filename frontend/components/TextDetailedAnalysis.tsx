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

class TextDetailedAnalysis extends React.Component<TextDetailedAnalysisProps, null> {

  constructor(props) {
    super(props);
  }

  render() {
    const tabColors = ["#FD6D22", "#3AA757", "#ED4596", "#752BEE", "#4DBDC5", "#FABB2D", "#3C85FA", "#FF4C4C"];

    return (
      <div className="page-column p-3" style={{boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.12)"}}>
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
            <div className="flex items-center justify-center flex-none px-1" style={{backgroundColor: tabColors[index % tabColors.length], color: "white", width: "26px", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex items-center flex-auto px-4" style={{backgroundColor: "#F3F6FD", fontSize: "18px", lineHeight: "27px"}}>
              {item.text}
            </div>
            <div className="flex items-center justify-center flex-none px-1" style={{backgroundColor: "#E1E6F0", color: "white", width: "42px", fontSize: "18px", lineHeight: "20px"}}>
              <FiEdit style={{color: "#167DF5"}} size={20}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TextDetailedAnalysis;
