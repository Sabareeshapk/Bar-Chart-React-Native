import React from "react";
import { Platform, StyleSheet, View } from "react-native";

let VictoryChart: any,
  VictoryBar: any,
  VictoryAxis: any,
  VictoryLabel: any,
  VictoryTheme: any,
  VictoryVoronoiContainer: any;

// Dynamic import (fix for web + mobile)
if (Platform.OS === "web") {
  const victory = require("victory");
  VictoryChart = victory.VictoryChart;
  VictoryBar = victory.VictoryBar;
  VictoryAxis = victory.VictoryAxis;
  VictoryLabel = victory.VictoryLabel;
  VictoryTheme = victory.VictoryTheme;
  VictoryVoronoiContainer = victory.VictoryVoronoiContainer;
} else {
  const victoryNative = require("victory-native");
  VictoryChart = victoryNative.VictoryChart;
  VictoryBar = victoryNative.VictoryBar;
  VictoryAxis = victoryNative.VictoryAxis;
  VictoryLabel = victoryNative.VictoryLabel;
  VictoryTheme = victoryNative.VictoryTheme;
  VictoryVoronoiContainer = victoryNative.VictoryVoronoiContainer;
}

export default function Index() {
  const data = [
    { day: "Monday", value: 43 },
    { day: "Tuesday", value: 75 },
    { day: "Wednesday", value: 55 },
    { day: "Thursday", value: 90 },
    { day: "Friday", value: 65 },
    { day: "Saturday", value: 30 },
    { day: "Sunday", value: 80 }
  ];

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD93D",
    "#1A535C",
    "#FF9F1C",
    "#6A4C93",
    "#2EC4B6"
  ];

  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        padding={{ top: 20, bottom: 100, left: 50, right: 20 }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }: any) => `${datum.day}: ${datum.value}`}
          />
        }
      >
        {/* X Axis */}
        <VictoryAxis
          tickValues={data.map(d => d.day)}
          tickLabelComponent={
            <VictoryLabel angle={-45} textAnchor="end" dy={10} />
          }
        />

        {/* Y Axis */}
        <VictoryAxis dependentAxis />

        {/* Bars */}
        <VictoryBar
          data={data}
          x="day"
          y="value"
          style={{
            data: {
              fill: ({ index }: any) => colors[index % colors.length]
            }
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});