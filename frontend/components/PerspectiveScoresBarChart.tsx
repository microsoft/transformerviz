// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import TextRecord from "../models/TextRecord";
import AnalyzedText from "../models/AnalyzedText";


type PerspectiveScoresBarChartState = {
  selectedScore: string
}

type PerspectiveScoresBarChartProps = {
  id: number,
  width: number,
  defaultSelectedScore: string,
  textRecord: TextRecord
}

class PerspectiveScoresBarChart extends Component<PerspectiveScoresBarChartProps, PerspectiveScoresBarChartState> {

  constructor(props) {
    super(props);

    this.state = {
      selectedScore: props.defaultSelectedScore
    };

    this.node = React.createRef<HTMLDivElement>();
    this.domID = `perspectivescoresbarchart-${props.id}`;
  }

  node: React.RefObject<HTMLDivElement>

  domID: string

  componentDidMount() {
    this.createDistributionBarChart();
  }

  componentDidUpdate() {
    this.createDistributionBarChart();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedScore: nextProps.defaultSelectedScore
    });
  }

  setSelectedScore = (selectedScore: string) => {
    this.setState({
      selectedScore: selectedScore
    });
  }

  createDistributionBarChart = () => {
    var _this = this;
    var body = d3.select(this.node.current);

    const getResultScoreObj: any = (item: AnalyzedText) => {
      let resultScores = [
        {label: "toxicity", value: item.toxicity, scoreName: "Toxicity"},
        {label: "severeToxicity", value: item.severeToxicity, scoreName: "Severe Toxicity"},
        {label: "identityAttack", value: item.identityAttack, scoreName: "Identity Attack"},
        {label: "insult", value: item.insult, scoreName: "Insult"},
        {label: "profanity", value: item.profanity, scoreName: "Profanity"},
        {label: "threat", value: item.threat, scoreName: "Threat"},
        {label: "sexuallyExplicit", value: item.sexuallyExplicit, scoreName: "Sexually Explicit"},
        {label: "flirtation", value: item.flirtation, scoreName: "Flirtation"}
      ];

      return resultScores;
    }

    var scores = getResultScoreObj(this.props.textRecord.original);

    var margin = { top: 5, right: 15, bottom: 50, left: 55 }
    var h = 111 - margin.top - margin.bottom
    var w = this.props.width;

    // SVG
    d3.select(`#${this.domID}`).remove();
    var svg = body.append('svg')
        .attr('id', this.domID)
        .attr('height',h + margin.top + margin.bottom)
        .attr('width',w)
        .attr('float', 'left');

    var xScale = d3.scaleBand().range([0, w-10]).padding(0.4),
        yScale = d3.scaleLinear().range([h, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(0," + margin.top + ")");

    xScale.domain(scores.map(function(d) { return d.label; }));
    yScale.domain([0.0, 1.0]);

    var selectedScoreObj = scores.filter(scoreObj => (scoreObj.label == this.state.selectedScore))[0];
    var selectedScoreMessage = `${selectedScoreObj.scoreName}: ${(selectedScoreObj.value*100).toFixed(2)}%`;

    g.append("g")
     .attr("transform", "translate(0," + h + ")")
     .append("text")
     .attr("y", 30)
     .attr("x", w/2)
     .attr("text-anchor", "middle")
     .attr("fill", "black")
     .attr("font-size", "14px")
     .text(selectedScoreMessage);

    g.selectAll(".bar")
     .data(scores)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d.label); })
     .attr("y", function(d) { return yScale(d.value); })
     .attr("width", xScale.bandwidth())
     .attr("height", function(d) { return h - yScale(d.value); })
     .attr("fill", function(d) { 
        if (d.value < 0.33) {
          return "#F994A1";
        }
        if (d.value < 0.66) {
          return "#FF374F";
        }
        return "#BB061C";
      })
     .classed("highlighted-bar", function(d) { return d.label == _this.state.selectedScore })
     .on("click", function(d) {
       _this.setSelectedScore(d.label);
     });
  }

  render() {
    return (
      <div className="plot plot-distribution">
        <div ref={this.node}/>
      </div>
    );
  }
}



export default PerspectiveScoresBarChart;
