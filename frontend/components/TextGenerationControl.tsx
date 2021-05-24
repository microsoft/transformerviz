import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Checkbox, Stack, Slider } from "office-ui-fabric-react";


type TextGenerationControlProps = {
  generateText: Function
}

type TextGenerationControlState = {
  textGenerationPrompt: string,
  model: string,
  doSample: boolean,
  earlyStopping: boolean,
  minLength: number,
  maxLength: number,
  topK: number,
  topP: number,
  temperature: number,
  numBeams: number
}

class TextGenerationControl extends React.Component<TextGenerationControlProps, TextGenerationControlState> {

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
      numBeams: 1
    }
  }

  generateTextClickHandler = () => {
    this.props.generateText({
      "prompt": this.state.textGenerationPrompt,
      "model": this.state.model,
      "do_sample": this.state.doSample,
      "early_stopping": this.state.earlyStopping,
      "min_length": this.state.minLength,
      "max_length": this.state.maxLength,
      "top_k": this.state.topK,
      "top_p": this.state.topP,
      "temperature": this.state.temperature,
      "num_beams": this.state.numBeams
    })
  }

  onTextPromptChange = (evt) => {
    this.setState({
      textGenerationPrompt: evt.target.value
    });
  }

  onSampleChange = (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
    this.setState({
      doSample: isChecked
    })
  }

  onEarlyStoppingChange = (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
    this.setState({
      earlyStopping: isChecked
    })
  }

  onMaxLengthChange = (evt: any) => {
    this.setState({
      maxLength: parseInt(evt.target.value)
    })
  }

  onMinLengthChange = (evt: any) => {
    this.setState({
      minLength: parseInt(evt.target.value)
    })
  }

  onTopKChange = (evt: any) => {
    this.setState({
      topK: parseInt(evt.target.value)
    })
  }

  onNumBeamsChange = (evt: any) => {
    this.setState({
      numBeams: parseInt(evt.target.value)
    })
  }

  onTemperatureChange = (value: number) => {
    this.setState({
      temperature: value
    });
  }

  onTopPChange = (value: number) => {
    this.setState({
      topP: value
    })
  }

  render() {

    return (
      <Fabric styles={{root: {width: "410px", backgroundColor: "white", padding: "24px", border: "1px solid #E7E7E7", borderRadius: "4px"}}}>
        <TextField
          label="Text Generation Prompt"
          name="prompt"
          value={this.state.textGenerationPrompt}
          onChange={this.onTextPromptChange}
        />
        <Stack styles={{root: {marginTop: "24px", marginBottom: "20px"}}}>
          <Checkbox label="Sample" onChange={this.onSampleChange} styles={{root: {paddingBottom: "16px"}}} />
          <Checkbox label="Early Stopping" onChange={this.onEarlyStoppingChange} />
        </Stack>
        <Stack>
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
        </Stack>
        <Stack>
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
        </Stack>
        <div className="text-generation-control-row">
          <DefaultButton type="primary" onClick={this.generateTextClickHandler}>Generate</DefaultButton>
        </div>
      </Fabric>
    );
  }
}

export default TextGenerationControl;
