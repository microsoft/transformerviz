import React, { FunctionComponent, useEffect, useState } from "react";
import * as d3 from "d3";
import * as _ from "lodash"
import ReactDOM from "react-dom";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { List } from "office-ui-fabric-react/lib/List";

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
        <div>Error generating text.</div>
      );
    } else if (this.props.loading) {
      return (
        <div>Loading...</div>
      );
    } else if (this.props.generatedResults.length == 0) {
      return (
        <>
        </>
      );
    }

    return (
      <div style={{marginLeft: "20px", marginRight: "20px"}}>
        <h4>Generated Results</h4>
        {this.props.generatedResults.map((item) => 
          <>
            {item.text}
          </>
        )}
      </div>
    );
  }
}

export default TextGenerationResults;
