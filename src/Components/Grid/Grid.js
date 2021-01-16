import React from "react";
import "./grid.scss";

import Cell from "../Cell/Cell";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorIndex: 0,
      randomValue :{x:Math.floor(Math.random()*2)+1,y:Math.floor(Math.random()*2)+1}
    };
  }


  handleClick = (e) => {
    this.setState({ colorIndex: this.state.colorIndex ? 0 : 1 });
  };

  getMatrics = () => {
    const rows = [];
    const { width, height,parentCallback} = this.props;
    for (let y = 0; y < height; y++) {
      const cols = [];
      for (let x = 0; x < width; x++) {
        cols.push(
          <td>
            <Cell x={x} y={y} randomValue={this.state.randomValue} parentCallback={parentCallback}></Cell>
          </td>
        );
      }

      rows.push(<tr>{cols}</tr>);
    }
    return rows;
  };

  render() {
    return (
      <div className="grid" onClick={this.handleClick}>
        <table>
          <tbody>{this.getMatrics()}</tbody>
        </table>
      </div>
    );
  }
}

export default Grid;
