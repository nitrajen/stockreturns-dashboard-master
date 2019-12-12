import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 0,
    position: "relative",
    borderLeft: "1px solid #ccc",
    overflow: "auto",
    backgroundColor: "#efefef"
  },
  card: {
    marginTop: 10
  },
  up: {
    color: "green"
  },
  down: {
    color: "red"
  }
};

class StockReturnsMetrics extends Component {
  getColour(symbol) {
    var colourMap = this.props.colours.find(c => c.symbol === symbol);
    if (colourMap !== undefined) return colourMap.colour;
  }
  render() {
    const { classes } = this.props;
    const metrics = this.props.metrics;

    return (
      <div
        className={classes.root}
        style={{
          width: metrics.length > 0 ? 250 : 0,
          padding: metrics.length > 0 ? 10 : 0
        }}
        ref={this.sidePanel}
      >
        {metrics
          .sort((a, b) => ("" + a.name).localeCompare(b.name))
          .map((item, index) => (
            <div key={item.name}>
              <Card
                className={classes.card}
                style={{
                  borderLeft: "4px solid " + this.getColour(item.symbol)
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" className={classes.title}>
                    {item.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {item.startDate} - {item.endDate}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={item.return >= 0 ? classes.up : classes.down}
                  >
                    {item.return >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                    {item.return}%
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StockReturnsMetrics);
