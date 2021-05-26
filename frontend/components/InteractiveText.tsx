import React from "react";
import TextRecord from "../models/TextRecord";
import AnalyzedText from "../models/AnalyzedText";
import { FiEdit } from "react-icons/fi";

type InteractiveTextProps = {
  textRecord: TextRecord;
  tabColor: string;
  editColor: string;
  submitEditText: Function,
  deleteEditText: Function,
};

type InteractiveTextState = {
  editMode: boolean;
  editText: string;
}

class InteractiveText extends React.Component<InteractiveTextProps, InteractiveTextState> {
  constructor(props) {
    super(props);

    let editText;
    if (this.props.textRecord.edited) {
      editText = this.props.textRecord.edited.text;
    } else {
      editText = this.props.textRecord.original.text;
    }

    this.state = {
      editMode: false,
      editText: editText
    };

    this.enableEditMode = this.enableEditMode.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.handleTextClear = this.handleTextClear.bind(this);
    this.handleTextEdit = this.handleTextEdit.bind(this);
  }

  enableEditMode() {
    this.setState({editMode: true});
  }

  handleTextSubmit() {
    this.props.submitEditText(this.props.textRecord.id, this.state.editText);
    this.setState({editMode: false});
  }

  handleTextClear() {
    this.props.deleteEditText(this.props.textRecord.id);
    this.setState({editMode: false});
  }

  handleTextEdit(event) {
    this.setState({editText: event.target.value});
  }

  render() {
    /*
        {this.props.selectedText.map((item, index) => 
          <div className="flex items-stretch mb-4" style={{minHeight: "110px"}}>
            <div className="flex items-center justify-center flex-none px-1" style={{backgroundColor: tabColors[index % tabColors.length], color: "white", width: "26px", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex items-center flex-auto px-4" style={{backgroundColor: "#F3F6FD", fontSize: "18px", lineHeight: "27px"}}>
              {item.text}
            </div>
            <div className="flex items-center justify-center flex-none px-1" style={{backgroundColor: "#E1E6F0", color: "white", width: "42px", fontSize: "18px", lineHeight: "20px"}}>
              <FiEdit style={{color: "#167DF5"}} size={20}/>
            </div>
          </div>
        )}
    */
    return (
      <>
        <div className="flex items-stretch mb-4" style={{ minHeight: "110px" }}>
          <div
            className="flex items-center justify-center flex-none px-1"
            style={{
              backgroundColor: this.props.tabColor,
              color: "white",
              width: "26px",
              fontSize: "18px",
              lineHeight: "20px",
            }}
          >
            {this.props.textRecord.id}
          </div>
          <div
            className="flex items-center flex-auto px-4"
            style={{
              backgroundColor: "#F3F6FD",
              fontSize: "18px",
              lineHeight: "27px",
            }}
          >
            {this.props.textRecord.original.text}
          </div>
          <button
            className="flex items-center justify-center flex-none px-1"
            style={{
              backgroundColor: "#E1E6F0",
              color: "white",
              width: "42px",
              fontSize: "18px",
              lineHeight: "20px",
            }}
            onClick={this.enableEditMode}
          >
            <FiEdit style={{ color: "#167DF5" }} />
          </button>
        </div>
        {
          this.props.textRecord.edited && !this.state.editMode ? 
            <div className="flex items-stretch mb-4" style={{ minHeight: "110px" }}>
              <div
                className="flex items-center flex-none px-1"
                style={{
                  backgroundColor: this.props.editColor,
                  color: "white",
                  fontSize: "18px",
                  lineHeight: "20px",
                }}
              >
                {this.props.textRecord.id}*
              </div>
              <div
                className="flex items-center flex-auto px-4"
                style={{
                  backgroundColor: "#F3F6FD",
                  fontSize: "18px",
                  lineHeight: "27px",
                }}
              >
                {this.props.textRecord.edited.text}
              </div>
              <button
                className="flex items-center flex-none px-1"
                style={{
                  backgroundColor: "#E1E6F0",
                  color: "white",
                  fontSize: "18px",
                  lineHeight: "20px",
                }}
                onClick={this.enableEditMode}
              >
                <FiEdit style={{ color: "#167DF5" }} />
              </button>
            </div> : null
        }
        {
          this.state.editMode ?
            <div className="flex items-stretch mb-4" style={{ minHeight: "110px" }}>
              <div
                className="flex items-center flex-none px-1"
                style={{
                  backgroundColor: this.props.editColor,
                  color: "white",
                  fontSize: "18px",
                  lineHeight: "20px",
                }}
              >
                {this.props.textRecord.id}*
              </div>
              <textarea
                className="flex-auto"
                style={{
                  backgroundColor: "white",
                  fontSize: "18px",
                  lineHeight: "27px",
                }}
                value={this.state.editText}
                onChange={this.handleTextEdit}
              />
              <div className="flex flex-col flex-none px-1">
                <button
                  className="flex items-center flex-none px-1"
                  style={{
                    backgroundColor: "#E1E6F0",
                    color: "white",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                  onClick={this.handleTextClear}
                >
                  X
                </button>
                <button
                  className="flex items-center flex-none px-1"
                  style={{
                    backgroundColor: "#E1E6F0",
                    color: "white",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                  onClick={this.handleTextSubmit}
                >
                  OK
                </button>
              </div>
            </div> : null
        }
      </>
    );
  }
}

export default InteractiveText;