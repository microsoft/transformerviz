// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";
import TextRecord from "../models/TextRecord";
import AnalyzedText from "../models/AnalyzedText";
import PerspectiveScoresSpiderChart from "./PerspectiveScoresSpiderChart";
import tinycolor from "tinycolor2";
import InteractiveText from "./InteractiveText";

type TextDetailedAnalysisProps = {
  selectedText: TextRecord[],
  submitEditText: Function,
  deleteEditText: Function,
}

class TabColor {
  original: string;
  edited: string;

  constructor(original: string, edited: string) {
    this.original = original;
    this.edited = edited;
  }
}

class TextDetailedAnalysis extends React.Component<TextDetailedAnalysisProps, null> {

  constructor(props) {
    super(props);
  }

  render() {
    const tabColors = [
      new TabColor("#FD6D22", "FABB2D"),
      new TabColor("#3AA757", "#4DBDC5"),
      new TabColor("#ED4596", "#FF4C4C"),
      new TabColor("#752BEE", "#3C85FA")
    ]

    const getColor = (i: number) => {
      return tabColors[i % tabColors.length];
    }

    const textScores = new Array<AnalyzedText>();
    const spiderColors = new Array<string>();

    this.props.selectedText.forEach((text, index) => {
      textScores.push(text.original);
      const color = getColor(index);
      spiderColors.push(color.original);

      if (text.edited) {
        textScores.push(text.edited);
        spiderColors.push(color.edited);
      }
    });

    return (
      <div className="page-column p-3" style={{boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.12)"}}>
        <h1 className="mb-4">Toxicity Analysis</h1>
        <div className="mb-4 text-2xl">
          <PerspectiveScoresSpiderChart
            scores={textScores}
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
            colors={spiderColors}
          />
        </div>
        {this.props.selectedText.map((item, index) => {
          const color = getColor(index);
          return <InteractiveText 
                   textRecord={item} 
                   tabColor={color.original} 
                   editColor={color.edited}
                   submitEditText={this.props.submitEditText}
                   deleteEditText={this.props.deleteEditText} />
        })}
      </div>
    );
  }
}

export default TextDetailedAnalysis;
