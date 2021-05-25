import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';


type PerspectiveScoresSpiderChartProps = {
  scores: any,
  axes: any,
  colors: any
}

class PerspectiveScoresSpiderChart extends Component<PerspectiveScoresSpiderChartProps, null> {

  constructor(props) {
    super(props);

    this.node = React.createRef<HTMLDivElement>();
    this.domID = `perspectivescoresradarchart`;
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

    var h = 310
    var w = 450;
    var maxRadius = 125;
    var centerX = 225;
    var centerY = 155;

    // SVG
    d3.select(`#${this.domID}`).remove();
    var svg = body.append('svg')
        .attr('id', this.domID)
        .attr('height', h)
        .attr('width', w)
        .attr('float', 'left');

    var radialScale = d3.scaleLinear()
        .domain([0.0, 1.0])
        .range([0, maxRadius]);
    var ticks = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];

    ticks.map(t =>
        svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("fill", "none")
        .attr("stroke", "rgba(224, 224, 224, 1)")
        .attr("stroke-width", "1px")
        .attr("r", radialScale(t))
    );

    const angleToCoordinate = (angle: number, value: number) => {
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": centerX + x, "y": centerY - y};
    }

    const getLabelOffset = (index: number, label: string) => {
      if (index == 1 || index == 2) {
        return {"x":  -(label.length) * 5, "y": 0.0};
      } else if (index == 3) {
        return {"x":  -(label.length) * 5, "y": 6};
      } else if (index == 4) {
        return {"x": -(label.length) * 2, "y": 12};
      } else if (index == 5) {
        return {"x": 0.0, "y": 12};
      } else if (index == 0) {
        return {"x": -(label.length) * 2, "y": -2.0};
      } else {
        return {"x": 0.0, "y": 0.0};
      }
    }

    for (var i = 0; i < this.props.axes.length; i++) {
        let axisName = this.props.axes[i][0];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / this.props.axes.length);
        let line_coordinate = angleToCoordinate(angle, 1.0);
        let label_coordinate = angleToCoordinate(angle, 1.05);
        let label_offset = getLabelOffset(i, axisName);

        //draw axis line
        svg.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke","rgba(224, 224, 224, 1)")
        .attr("stroke-width", "1px");

        //draw axis label
        svg.append("text")
        .attr("x", label_coordinate.x + label_offset.x)
        .attr("y", label_coordinate.y + label_offset.y)
        .attr("font-size", "12px")
        .text(axisName);
    }

    let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];

    const getPathCoordinates = (scoreData: any) => {
        let coordinates = [];
        for (var i = 0; i < this.props.axes.length; i++){
            let axisFeatureName = this.props.axes[i][1];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / this.props.axes.length);
            coordinates.push(angleToCoordinate(angle, scoreData[axisFeatureName]));
        }
        let axisFeatureName = this.props.axes[0][1];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / this.props.axes.length);
        coordinates.push(angleToCoordinate(angle, scoreData[axisFeatureName]));

        return coordinates;
    }

    for (var i = 0; i < this.props.scores.length; i ++){
        let d = this.props.scores[i];
        let color = this.props.colors[i % this.props.colors.length];
        let coordinates = getPathCoordinates(d);

        //draw the path element
        svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 2)
        .attr("stroke", color)
        .attr("stroke-opacity", 1)
        .attr("fill", color)
        .attr("fill-opacity", 0.5);
    }

  }

  render() {
    return (
       <div className="plot plot-spider" ref={this.node}/>
    );
  }
}



export default PerspectiveScoresSpiderChart;
