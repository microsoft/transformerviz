import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Checkbox, Stack, Slider } from "office-ui-fabric-react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

type TextGenerationControlProps = {
  generateText: Function;
};

type TextGenerationControlState = {
  textGenerationPrompt: string;
  model: string;
  doSample: boolean;
  earlyStopping: boolean;
  isFolded: boolean;
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
      doSample: true,
      earlyStopping: false,
      isFolded: false,
      minLength: 10,
      maxLength: 70,
      topK: 0,
      topP: 0.8,
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

  toggleFold = () => {
    this.setState({
      isFolded: !this.state.isFolded
    });
  }

  render() {
    if (this.state.isFolded) {
      return (
        <div
          style={{
              backgroundColor: "white",
              padding: "24px",
              border: "1px solid #E7E7E7",
              borderRadius: "4px",
              boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.12)",
              marginBottom: "30px"
          }}
        >
          <div className="flex items-center">
            <h1 className="mr-4">Text Generation Prompt</h1>
            <TextField
                className="flex-auto"
                name="prompt"
                value={this.state.textGenerationPrompt}
                onChange={this.onTextPromptChange}
              />
          </div>
          <button className="flex items-center justify-center w-full p-1" onClick={() => this.toggleFold()}>
              <FiChevronDown />
          </button>
        </div>
      )
    } else {
      return (
        <div
          style={{
              backgroundColor: "white",
              padding: "24px",
              border: "1px solid #E7E7E7",
              borderRadius: "4px",
              boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.12)",
              marginBottom: "30px"
          }}
        >
          <div className="flex items-end mb-4">
            <TextField
              className="flex-initial w-11/12 mr-4"
              label="Text Generation Prompt"
              placeholder="Input your prompt"
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
              checked={this.state.doSample}
            />
            <Checkbox
              label="Early Stopping"
              onChange={this.onEarlyStoppingChange}
              checked={this.state.earlyStopping}
            />
            <TextField
              label="Max Length"
              onChange={this.onMaxLengthChange}
              value={this.state.maxLength.toString()}
            />
            <TextField
              label="Min Length"
              onChange={this.onMinLengthChange}
              value={this.state.minLength.toString()}
            />
            <TextField
              label="Top k"
              onChange={this.onTopKChange}
              value={this.state.topK.toString()}
            />
            <TextField
              label="Num. Beams"
              onChange={this.onNumBeamsChange}
              value={this.state.numBeams.toString()}
            />
            <Slider
              label="Temperature"
              min={0.0}
              max={1.0}
              step={0.1}
              onChange={this.onTemperatureChange}
              value={this.state.temperature}
            />
            <Slider
              label="Top p"
              min={0.0}
              max={1.0}
              step={0.1}
              onChange={this.onTopPChange}
              value={this.state.topP}
            />
          </div>
          <button className="flex items-center justify-center w-full p-1" onClick={() => this.toggleFold()}>
              <FiChevronUp />
          </button>
        </div>
      );
    }
  }
}

export default TextGenerationControl;
