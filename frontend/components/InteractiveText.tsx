import React from "react";
import TextRecord from "../models/TextRecord";
import AnalyzedText from "../models/AnalyzedText";
import { FiEdit, FiX, FiCheck } from "react-icons/fi";

type InteractiveTextProps = {
  textRecord: TextRecord;
  tabColor: string;
  editColor: string;
  submitEditText: Function;
  deleteEditText: Function;
};

type InteractiveTextState = {
  editMode: boolean;
  editText: string;
};

class InteractiveText extends React.Component<
  InteractiveTextProps,
  InteractiveTextState
> {
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
      editText: editText,
    };

    this.enableEditMode = this.enableEditMode.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.handleTextClear = this.handleTextClear.bind(this);
    this.handleTextEdit = this.handleTextEdit.bind(this);
  }

  enableEditMode() {
    this.setState({ editMode: true });
  }

  handleTextSubmit() {
    this.props.submitEditText(this.props.textRecord.id, this.state.editText);
    this.setState({ editMode: false });
  }

  handleTextClear() {
    this.props.deleteEditText(this.props.textRecord.id);
    this.setState({ editMode: false });
  }

  handleTextEdit(event) {
    this.setState({ editText: event.target.value });
  }

  render() {
    const getEditText = (record: TextRecord) => {
      if (record.editLoading) {
        return "Loading...";
      } else if (record.editError) {
        return (
          <>
            <div style={{color: "red"}}>Error: {record.editError.message}</div>
            <div>{record.edited?.text}</div>
          </>
        );
      } else {
        return record.edited.text;
      }
    }

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
              width: "42px",
              fontSize: "18px",
              lineHeight: "20px",
            }}
            onClick={this.enableEditMode}
          >
            <FiEdit style={{ color: "#167DF5" }} size={20} />
          </button>
        </div>
        {(this.props.textRecord.edited || this.props.textRecord.editLoading) && !this.state.editMode ? (
          <div
            className="flex items-stretch mb-4"
            style={{ minHeight: "110px" }}
          >
            <div
              className="flex items-center flex-none px-1"
              style={{
                backgroundColor: this.props.editColor,
                color: "white",
                width: "26px",
                fontSize: "18px",
                lineHeight: "20px",
              }}
            >
              {this.props.textRecord.id}*
            </div>
            <div
              className="flex flex-col justify-center flex-auto px-4"
              style={{
                backgroundColor: "#F3F6FD",
                fontSize: "18px",
                lineHeight: "27px",
              }}
            >
              { getEditText(this.props.textRecord) }
            </div>
            <button
              className="flex items-center justify-center flex-none px-1"
              style={{
                backgroundColor: "#E1E6F0",
                width: "42px",
                fontSize: "18px",
                lineHeight: "20px",
              }}
              onClick={this.enableEditMode}
            >
              <FiEdit style={{ color: "#167DF5" }} size={20} />
            </button>
          </div>
        ) : null}
        {this.state.editMode ? (
          <div
            className="flex items-stretch mb-4"
            style={{ minHeight: "110px" }}
          >
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
                padding: "10px",
                border: "solid black 1px",
              }}
              value={this.state.editText}
              onChange={this.handleTextEdit}
            />
            <div
              className="flex flex-col items-center justify-center flex-none px-1"
              style={{
                backgroundColor: "#E1E6F0",
                width: "42px",
                lineHeight: "20px",
              }}
            >
              <button
                className="flex items-center flex-grow px-1"
                style={{
                  backgroundColor: "#E1E6F0",
                  lineHeight: "20px",
                }}
                onClick={this.handleTextClear}
              >
                <FiX style={{ color: "#167DF5" }} size={20} />
              </button>
              <button
                className="flex items-center flex-grow px-1"
                style={{
                  backgroundColor: "#E1E6F0",
                  color: "white",
                  lineHeight: "20px",
                }}
                onClick={this.handleTextSubmit}
              >
                <FiCheck style={{ color: "#167DF5" }} size={20}/>
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default InteractiveText;
