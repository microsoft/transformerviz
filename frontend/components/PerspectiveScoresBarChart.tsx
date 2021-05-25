import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';


type PerspectiveScoresBarChartState = {
  selectedScore: string
}

type PerspectiveScoresBarChartProps = {
  id: number,
  scores: any,
  defaultSelectedScore: string
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

  setSelectedScore = (selectedScore: string) => {
    this.setState({
      selectedScore: selectedScore
    });
  }

  createDistributionBarChart = () => {
    var _this = this;
    var body = d3.select(this.node.current);

    var margin = { top: 5, right: 15, bottom: 50, left: 55 }
    var h = 111 - margin.top - margin.bottom
    var w = 200;

    // SVG
    d3.select(`#${this.domID}`).remove();
    var svg = body.append('svg')
        .attr('id', this.domID)
        .attr('height',h + margin.top + margin.bottom)
        .attr('width',w)
        .attr('float', 'left');

    var xScale = d3.scaleBand().range([0, w]).padding(0.4),
        yScale = d3.scaleLinear().range([h, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 55 + "," + margin.top + ")");

    xScale.domain(this.props.scores.map(function(d) { return d.score; }));
    yScale.domain([0.0, 1.0]);

    var selectedScoreObj = this.props.scores.filter(scoreObj => (scoreObj.score == this.state.selectedScore))[0];
    var selectedScoreMessage = `${selectedScoreObj.scoreName}: ${selectedScoreObj.value.toFixed(2)}`;

    g.append("g")
     .attr("transform", "translate(0," + h + ")")
     .append("text")
     .attr("y", 30)
     .attr("x", (w + margin.left)/2)
     .attr("text-anchor", "end")
     .attr("fill", "black")
     .attr("font-size", "14px")
     .text(selectedScoreMessage);

    g.selectAll(".bar")
     .data(this.props.scores)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d.score); })
     .attr("y", function(d) { return yScale(d.value); })
     .attr("width", xScale.bandwidth())
     .attr("height", function(d) { return h - yScale(d.value); })
     .classed("highlighted-bar", function(d) { return d.score == _this.state.selectedScore })
     .on("click", function(d) {
       _this.setSelectedScore(d.score);
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
