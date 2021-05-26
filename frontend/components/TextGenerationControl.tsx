import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Checkbox, Stack, Slider } from "office-ui-fabric-react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

type TextGenerationControlProps = {
  generateText: Function;
  onFold: Function;
  isFolded: boolean;
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
      doSample: true,
      earlyStopping: false,
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
    this.props.onFold();
  }

  render() {
    const textFieldStyle = {root: {width: "110px", display: "inline-block"}};
    if (this.props.isFolded) {
      return (
        <div id="text_gen_form"
          style={{
              backgroundColor: "white",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "24px",
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
              <FiChevronDown size={25} className="light-gray-text" />
          </button>
        </div>
      )
    } else {
      return (
        <div id="text_gen_form"
          style={{
              backgroundColor: "white",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "24px",
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
          <div className="text-gen-form-grid p-4" style={{backgroundColor: "#F3F6FD"}}>
            <div className="grid grid-rows-2 items-center">
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
            </div>
            <div className="stacked-text-field-grid">
              <span className="mr-3 font-semibold text-right">Max Length</span>
              <div>
                <MaskedTextField
                  onChange={this.onMaxLengthChange}
                  value={this.state.maxLength.toString()}
                  mask="999"
                  maskChar=""
                  styles={textFieldStyle}
                />
                <span className="ml-3 light-gray-text">[1-100]</span>
              </div>
              <span className="mr-3 font-semibold text-right">Min Length</span>
              <div>
                <MaskedTextField
                  onChange={this.onMinLengthChange}
                  value={this.state.minLength.toString()}
                  mask="999"
                  maskChar=""
                  styles={textFieldStyle}
                />
                <span className="ml-3 light-gray-text">[1-100]</span>
              </div>
            </div>
            <div className="stacked-text-field-grid">
              <span className="mr-3 font-semibold text-right">Num. Beams</span>
              <div>
                <MaskedTextField
                  onChange={this.onNumBeamsChange}
                  value={this.state.numBeams.toString()}
                  mask="999"
                  maskChar=""
                  styles={textFieldStyle}
                />
                <span className="ml-3 light-gray-text">[1-100]</span>
              </div>
              <span className="mr-3 font-semibold text-right">Top K</span>
              <div>
                <MaskedTextField
                  onChange={this.onTopKChange}
                  value={this.state.topK.toString()}
                  mask="999"
                  maskChar=""
                  styles={textFieldStyle}
                />
                <div/>
              </div>
            </div>
            <div className="grid grid-rows-2">
              <Slider
                label="Temperature"
                min={0.0}
                max={1.0}
                step={0.1}
                onChange={this.onTemperatureChange}
                value={this.state.temperature}
              />
              <Slider
                label="Top P"
                min={0.0}
                max={1.0}
                step={0.1}
                onChange={this.onTopPChange}
                value={this.state.topP}
              />
            </div>
          </div>
          <button className="flex items-center justify-center w-full p-1" onClick={() => this.toggleFold()}>
              <FiChevronUp size={25} className="light-gray-text" />
          </button>
        </div>
      );
    }
  }
}

export default TextGenerationControl;
