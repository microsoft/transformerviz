import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { List } from "office-ui-fabric-react/lib/List";


const onRenderCell = (item: any, index: number | undefined): JSX.Element => {
  return (
    <div className="text-result">
      <div className="text-result-content-score">Toxicity Score: {item.perspective.attributeScores.TOXICITY.summaryScore.value}</div>
      <div className="text-result-content-score">Severe Toxicity Score: {item.perspective.attributeScores.SEVERE_TOXICITY.summaryScore.value}</div>
      <div className="text-result-content-score">Identity Attack: {item.perspective.attributeScores.IDENTITY_ATTACK.summaryScore.value}</div>
      <div className="text-result-content-score">Insult Score: {item.perspective.attributeScores.INSULT.summaryScore.value}</div>
      <div className="text-result-content-score">Profanity Score: {item.perspective.attributeScores.PROFANITY.summaryScore.value}</div>
      <div className="text-result-content-score">Threat Score: {item.perspective.attributeScores.THREAT.summaryScore.value}</div>
      <div className="text-result-content-score">Sexually Explicit Score: {item.perspective.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value}</div>
      <div className="text-result-content-score">Flirtation Score: {item.perspective.attributeScores.FLIRTATION.summaryScore.value}</div>
      <div className="text-result-content-generated-text">{item.text}</div>
    </div>
  );
};


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
        <Fabric>
          <div>Error generating text.</div>
        </Fabric>
      );
    } else if (this.props.loading) {
      return (
        <Fabric>
          <div>Loading...</div>
        </Fabric>
      );
    } else if (this.props.generatedResults.length == 0) {
      return (
        <Fabric>
        </Fabric>
      );
    }

    return (
      <Fabric>
        <section>
          <h4>Text Generation Results</h4>
          <List items={this.props.generatedResults} onRenderCell={onRenderCell} />
        </section>
      </Fabric>
    );
  }
}

export default TextGenerationResults;
