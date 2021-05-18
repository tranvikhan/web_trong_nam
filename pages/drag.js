import { Button } from "antd";
import React from "react";
import GridLayout from "react-grid-layout";

export default class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 },
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <Button key="a">Khan 1</Button>
        <Button key="b">Khan 2</Button>
        <Button key="c">Khan 3</Button>
      </GridLayout>
    );
  }
}
