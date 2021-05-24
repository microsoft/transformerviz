import React, { FunctionComponent, useEffect, useState } from "react";
import * as d3 from "d3";
import * as _ from "lodash"
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { List } from "office-ui-fabric-react/lib/List";

type TextGenerationResultsProps = {
  generatedResults: any,
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
    } else if (this.props.generatedResults.length == 0) {
      return (
        <>
        </>
      );
    }

    const renderResult: React.FunctionComponent<any> = (item: any) => {
      const svgContainerId = _.uniqueId("svg-");
      console.log("svgContainerId", svgContainerId);
      /*
      useEffect(() => {
        //const svg = d3.select(`#${svgContainerId}`).append("svg").attr("width", 700).attr("height", 300);
        const svg = d3.select(`#${svgContainerId}`);
        console.log(svg);
      })
      */
      return (
        <div style={{backgroundColor: "white", padding: "14px", marginBottom: "12px"}}>
          <div className="text-result">
            <div className="text-result-content-generated-text">{item.text}</div>
            <hr/>
            <div id={svgContainerId}/>
            <div className="text-result-content-score">Toxicity Score: {item.perspective.attributeScores.TOXICITY.summaryScore.value}</div>
            <div className="text-result-content-score">Severe Toxicity Score: {item.perspective.attributeScores.SEVERE_TOXICITY.summaryScore.value}</div>
            <div className="text-result-content-score">Identity Attack: {item.perspective.attributeScores.IDENTITY_ATTACK.summaryScore.value}</div>
            <div className="text-result-content-score">Insult Score: {item.perspective.attributeScores.INSULT.summaryScore.value}</div>
            <div className="text-result-content-score">Profanity Score: {item.perspective.attributeScores.PROFANITY.summaryScore.value}</div>
            <div className="text-result-content-score">Threat Score: {item.perspective.attributeScores.THREAT.summaryScore.value}</div>
            <div className="text-result-content-score">Sexually Explicit Score: {item.perspective.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value}</div>
            <div className="text-result-content-score">Flirtation Score: {item.perspective.attributeScores.FLIRTATION.summaryScore.value}</div>
          </div>
        </div>
      );
    };

    return (
      <div style={{marginLeft: "20px", marginRight: "20px"}}>
        <h4>Results analysis</h4>
        {this.props.generatedResults.map(renderResult)}
      </div>
    );
  }
}

export default TextGenerationResults;
