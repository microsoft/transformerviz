import React from "react";
import { ComboBox, IComboBoxOption, Stack } from "office-ui-fabric-react"
import AnalyzedText from "../models/AnalyzedText";
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

    const sortOptions: IComboBoxOption[] = [
      { key: 'toxicity', text: 'Toxicity' },
      { key: 'severe', text: 'Severe Toxicity' },
      { key: 'identity', text: 'Identity Attack' },
      { key: 'insult', text: 'Insult' },
      { key: 'profanity', text: 'Profanity' },
      { key: 'threat', text: 'Threat' },
      { key: 'sexually', text: 'Sexually Explicit' },
      { key: 'flirtation', text: 'Flirtation' },
    ];

    const scoreOptions: IComboBoxOption[] = [
      { key: 'all', text: 'All Scores' },
      { key: 'toxicity', text: 'Toxicity' },
      { key: 'severe', text: 'Severe Toxicity' },
      { key: 'identity', text: 'Identity Attack' },
      { key: 'insult', text: 'Insult' },
      { key: 'profanity', text: 'Profanity' },
      { key: 'threat', text: 'Threat' },
      { key: 'sexually', text: 'Sexually Explicit' },
      { key: 'flirtation', text: 'Flirtation' },
    ];

    const chartWidth = 140;

    return (
      <div className="page-column">
        <div className="scroll-pane">
        <h1>Generated Results</h1>
        <Stack horizontal horizontalAlign="end" tokens={{childrenGap: 20}} styles={{root: {marginBottom: "16px"}}}>
          <ComboBox
            label="Sort by"
            options={sortOptions}
            styles={{root: {maxWidth: 160}}}
          />
          <ComboBox
            label="Show score"
            options={scoreOptions}
            styles={{root: {maxWidth: 160}}}
          />
        </Stack>
        {this.props.analysisResults.map((item) => 
          <div className="flex items-stretch mb-4" style={{minHeight: "110px", border: this.props.selectedTextIds.includes(item.id) ? "solid #167DF5 2px" : "none"}}>
            <div className="flex items-center flex-none px-1" style={{backgroundColor: "#8894B1", color: "white", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex-none" style={{width: `${chartWidth}px`, border: "solid #E7E7E7 1px"}}>
              <PerspectiveScoresBarChart id={item.id} width={chartWidth} scores={getResultScoreObj(item)} defaultSelectedScore="TOXICITY" />
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
      </div>
    );
  }
}

export default TextGenerationResults;
