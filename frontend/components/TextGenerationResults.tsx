// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";
import { ComboBox, Dropdown, IComboBoxOption, IDropdownOption, Stack } from "office-ui-fabric-react"
import TextRecord from "../models/TextRecord";
import PerspectiveScoresBarChart from "./PerspectiveScoresBarChart";
import { IconSortDescending, IconSortAscending } from '@tabler/icons';

type TextGenerationResultsProps = {
  analysisResults: TextRecord[],
  onSelectTextId: Function,
  selectedTextIds: number[],
  loading?: boolean,
  error?: any
}

type TextGenerationResultsState = {
  analysisResults: TextRecord[],
  highlightScoreLabel: string,
  sortByLabel: string,
  sortDescending: boolean,
}

class TextGenerationResults extends React.Component<TextGenerationResultsProps, TextGenerationResultsState> {

  constructor(props) {
    super(props);

    this.state = {
      analysisResults: props.analysisResults,
      highlightScoreLabel: "toxicity",
      sortByLabel: "none",
      sortDescending: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      analysisResults: nextProps.analysisResults,
      highlightScoreLabel: "toxicity",
      sortByLabel: "none",
      sortDescending: true
    });
  }

  sortGeneratedTextResults(scoreLabel, sortDescending) {
    if (scoreLabel == "none") {
      this.setState({
        sortByLabel: scoreLabel,
        analysisResults: this.props.analysisResults
      });
    } else if (sortDescending) {
      const sortedAnalysisResultsDescending = this.state.analysisResults.map((result) => result).sort((resultA, resultB) => {
        if (resultA[scoreLabel] < resultB[scoreLabel]) {
          return 1;
        } else if (resultA[scoreLabel] == resultB[scoreLabel]) {
          return 0;
        } else {
          return -1;
        }
      });

      this.setState({
        sortByLabel: scoreLabel,
        analysisResults: sortedAnalysisResultsDescending
      });
    } else if (!sortDescending) {
      const sortedAnalysisResultsAscending = this.state.analysisResults.map((result) => result).sort((resultA, resultB) => {
        if (resultA[scoreLabel] < resultB[scoreLabel]) {
          return -1;
        } else if (resultA.original[scoreLabel] == resultB.original[scoreLabel]) {
          return 0;
        } else {
          return 1;
        }
      });

      this.setState({
        sortByLabel: scoreLabel,
        analysisResults: sortedAnalysisResultsAscending
      });
    }
  }

  setHighlightedScoreLabel(scoreLabel) {
    if (scoreLabel != this.state.highlightScoreLabel) {
      this.setState({
        analysisResults: this.props.analysisResults,
        highlightScoreLabel: scoreLabel,
        sortByLabel: "none"
      });
    }
  }

  sortDescending() {
    this.setState({
      sortDescending: true
    });
    this.sortGeneratedTextResults(this.state.sortByLabel, true);
  }

  sortAscending() {
    this.setState({
      sortDescending: false
    });
    this.sortGeneratedTextResults(this.state.sortByLabel, false);
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

    const sortOptions: IDropdownOption[] = [
      { key: 'none', text: 'None'},
      { key: 'toxicity', text: 'Toxicity' },
      { key: 'severeToxicity', text: 'Severe Toxicity' },
      { key: 'identityAttack', text: 'Identity Attack' },
      { key: 'insult', text: 'Insult' },
      { key: 'profanity', text: 'Profanity' },
      { key: 'threat', text: 'Threat' },
      { key: 'sexuallyExplicit', text: 'Sexually Explicit' },
      { key: 'flirtation', text: 'Flirtation' },
    ];

    const scoreOptions: IDropdownOption[] = [
      { key: 'toxicity', text: 'Toxicity' },
      { key: 'severeToxicity', text: 'Severe Toxicity' },
      { key: 'identityAttack', text: 'Identity Attack' },
      { key: 'insult', text: 'Insult' },
      { key: 'profanity', text: 'Profanity' },
      { key: 'threat', text: 'Threat' },
      { key: 'sexuallyExplicit', text: 'Sexually Explicit' },
      { key: 'flirtation', text: 'Flirtation' },
    ];

    const getSortClass = (enabled: boolean) => {
      if (enabled) {
        return "sort-button";
      } else {
        return "sort-button disabled-button";
      }
    }

    const chartWidth = 160;

    const getAscendingDescendingButtons = () => {
      if (this.state.sortByLabel != "none") {
        return (
          <div className="flex items-end">
            <button className={getSortClass(this.state.sortDescending)} onClick={() => this.sortDescending()} ><IconSortDescending size={30} /></button>
            <button className={getSortClass(!this.state.sortDescending)} onClick={() => this.sortAscending()} ><IconSortAscending size={30} /></button>
          </div>
        );
      }

      return (<React.Fragment />);
    }

    return (
      <div className="page-column p-3">
        <div className="scroll-pane">
        <h1>Generated Results</h1>
        <Stack horizontal horizontalAlign="end" tokens={{childrenGap: 20}} styles={{root: {marginBottom: "16px"}}}>
          {getAscendingDescendingButtons()}
          <div className="flex items-end">
            <button className={getSortClass(this.state.sortDescending)} onClick={() => this.sortDescending()} ><IconSortDescending size={30} /></button>
            <button className={getSortClass(!this.state.sortDescending)} onClick={() => this.sortAscending()} ><IconSortAscending size={30} /></button>
          </div>
          <Dropdown
            label="Sort by"
            options={sortOptions}
            styles={{root: {minWidth: 160}}}
            selectedKey={this.state.sortByLabel}
            onChange={(evt, option) => {
              this.sortGeneratedTextResults(option.key, this.state.sortDescending);
            }}
          />
          <Dropdown
            label="Show score"
            options={scoreOptions}
            styles={{root: {minWidth: 160}}}
            selectedKey={this.state.highlightScoreLabel}
            onChange={(evt, option) => {
              this.setHighlightedScoreLabel(option.key);
            }}
          />
        </Stack>
        {this.state.analysisResults.map((item) => 
          <div className="flex items-stretch mb-5" style={{minHeight: "110px", border: this.props.selectedTextIds.includes(item.id) ? "solid #167DF5 2px" : "none"}}>
            <div className="flex items-center justify-center flex-none px-1" style={{backgroundColor: "#8894B1", color: "white", width: "26px", fontSize: "18px", lineHeight: "20px"}}>
              {item.id}
            </div>
            <div className="flex-none" style={{width: `${chartWidth}px`, border: "5px solid #F3F6FD"}}>
              <PerspectiveScoresBarChart id={item.id} width={chartWidth} textRecord={item} defaultSelectedScore={this.state.highlightScoreLabel} />
            </div>
            <button 
              className="flex items-center flex-auto text-left px-4"
              style={{backgroundColor: "#F3F6FD", fontSize: "18px", lineHeight: "27px"}}
              onClick={() => this.props.onSelectTextId(item.id)}
            >
              {item.original.text}
            </button>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default TextGenerationResults;
