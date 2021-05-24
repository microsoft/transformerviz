import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Checkbox, Stack, Slider } from "office-ui-fabric-react";

type TextGenerationControlProps = {
  generateText: Function;
};

type TextGenerationControlState = {
  textGenerationPrompt: string;
  model: string;
  doSample: boolean;
  earlyStopping: boolean;
  minLength: number;
  maxLength: number;
  topK: number;
  topP: number;
  temperature: number;
  numBeams: number;
};

class TextGenerationControl extends React.Component<
  TextGenerationControlProps,
  TextGenerationControlState
> {
  constructor(props) {
    super(props);
    this.state = {
      textGenerationPrompt: "",
      model: "gpt2",
      doSample: false,
      earlyStopping: false,
      minLength: 10,
      maxLength: 20,
      topK: 50,
      topP: 1.0,
      temperature: 1.0,
      numBeams: 1,
    };
  }

  generateTextClickHandler = () => {
    this.props.generateText({
      prompt: this.state.textGenerationPrompt,
      model: this.state.model,
      do_sample: this.state.doSample,
      early_stopping: this.state.earlyStopping,
      min_length: this.state.minLength,
      max_length: this.state.maxLength,
      top_k: this.state.topK,
      top_p: this.state.topP,
      temperature: this.state.temperature,
      num_beams: this.state.numBeams,
    });
  };

  onTextPromptChange = (evt) => {
    this.setState({
      textGenerationPrompt: evt.target.value,
    });
  };

  onSampleChange = (
    evt?: React.FormEvent<HTMLElement | HTMLInputElement>,
    isChecked?: boolean
  ) => {
    this.setState({
      doSample: isChecked,
    });
  };

  onEarlyStoppingChange = (
    evt?: React.FormEvent<HTMLElement | HTMLInputElement>,
    isChecked?: boolean
  ) => {
    this.setState({
      earlyStopping: isChecked,
    });
  };

  onMaxLengthChange = (evt: any) => {
    this.setState({
      maxLength: parseInt(evt.target.value),
    });
  };

  onMinLengthChange = (evt: any) => {
    this.setState({
      minLength: parseInt(evt.target.value),
    });
  };

  onTopKChange = (evt: any) => {
    this.setState({
      topK: parseInt(evt.target.value),
    });
  };

  onNumBeamsChange = (evt: any) => {
    this.setState({
      numBeams: parseInt(evt.target.value),
    });
  };

  onTemperatureChange = (value: number) => {
    this.setState({
      temperature: value,
    });
  };

  onTopPChange = (value: number) => {
    this.setState({
      topP: value,
    });
  };

  render() {
    return (
      <div
        style={{
            backgroundColor: "white",
            padding: "24px",
            border: "1px solid #E7E7E7",
            borderRadius: "4px",
            boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.12)"
        }}
      >
        <div className="flex items-end mb-4">
          <TextField
            className="flex-initial w-11/12 mr-4"
            label="Text Generation Prompt"
            name="prompt"
            value={this.state.textGenerationPrompt}
            onChange={this.onTextPromptChange}
          />
          <PrimaryButton 
            className="flex-auto"
            text="Generate"
            onClick={this.generateTextClickHandler}
          />
        </div>
        <div className="grid grid-rows-2 gap-4 grid-flow-col p-5" style={{backgroundColor: "#F3F6FD"}}>
          <Checkbox
            label="Sample"
            onChange={this.onSampleChange}
            styles={{ root: { paddingBottom: "16px" } }}
          />
          <Checkbox
            label="Early Stopping"
            onChange={this.onEarlyStoppingChange}
          />
          <TextField
            label="Max Length"
            defaultValue="20"
            onChange={this.onMaxLengthChange}
          />
          <TextField
            label="Min Length"
            defaultValue="10"
            onChange={this.onMinLengthChange}
          />
          <TextField
            label="Top k"
            defaultValue="50"
            onChange={this.onTopKChange}
          />
          <TextField
            label="Num. Beams"
            defaultValue="1"
            onChange={this.onNumBeamsChange}
          />
          <Slider
            label="Temperature"
            min={0.0}
            max={1.0}
            step={0.1}
            onChange={this.onTemperatureChange}
          />
          <Slider
            label="Top p"
            min={0.0}
            max={1.0}
            step={0.1}
            onChange={this.onTopPChange}
          />
        </div>
      </div>
    );
  }
}

export default TextGenerationControl;
