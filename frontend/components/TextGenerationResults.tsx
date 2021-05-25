import React from "react";
import * as _ from "lodash"
import AnalyzedText from "../models/AnalyzedText";
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { List } from "office-ui-fabric-react/lib/List";
import PerspectiveScoresBarChart from "./PerspectiveScoresBarChart";

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

    const getResultScoreObj: any = (item: any) => {
      let resultScores = [
        {score: "TOXICITY", value: item.toxicity, scoreName: "Toxicity"},
        {score: "SEVERE_TOXICITY", value: item.severeToxicity, scoreName: "Severe Toxicity"},
        {score: "IDENTITY_ATTACK", value: item.identityAttack, scoreName: "Identity Attack"},
        {score: "INSULT", value: item.insult, scoreName: "Insult"},
        {score: "PROFANITY", value: item.profanity, scoreName: "Profanity"},
        {score: "THREAT", value: item.threat, scoreName: "Threat"},
        {score: "SEXUALLY_EXPLICIT", value: item.sexuallyExplicit, scoreName: "Sexually Explicit"},
        {score: "FLIRTATION", value: item.flirtation, scoreName: "Flirtation"}
      ];

      return resultScores;
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
              <PerspectiveScoresBarChart id={item.id} scores={getResultScoreObj(item)} defaultSelectedScore="TOXICITY" />
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
