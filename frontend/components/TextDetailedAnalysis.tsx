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

class TextDetailedAnalysis extends React.Component<TextDetailedAnalysisProps, null> {

  constructor(props) {
    super(props);
  }

  render() {

    const getColor = (i: number) => {
      const tabColors = ["#FD6D22", "#3AA757", "#ED4596", "#752BEE", "#4DBDC5", "#FABB2D", "#3C85FA", "#FF4C4C"];
      return tabColors[i % tabColors.length];
    }

    const getEditColor = (baseColor: string) => {
      return tinycolor(baseColor).lighten(20).toHexString();
    }

    const textScores = new Array<AnalyzedText>();
    const spiderColors = new Array<string>();

    this.props.selectedText.forEach((text, index) => {
      textScores.push(text.original);
      const color = getColor(index);
      spiderColors.push(color);

      if (text.edited) {
        textScores.push(text.edited);
        spiderColors.push(getEditColor(color));
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
                   tabColor={color} 
                   editColor={getEditColor(color)}
                   submitEditText={this.props.submitEditText}
                   deleteEditText={this.props.deleteEditText} />
        })}
      </div>
    );
  }
}

export default TextDetailedAnalysis;
