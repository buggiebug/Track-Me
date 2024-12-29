import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const LineChartModal = ({ labels, data, legend }: any) => {
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const chartData = {
    labels: labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: data || [200, 450, 280, 800, 990, 430, 220],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2, // Line thickness
      }
    ],
    legend: legend || ["Week Expenses"], // Legends for the datasets
  };

  const chartConfig = {
    // backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    decimalPlaces: 2,
  };

  let timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleDataPointClick = (data: any) => {
    if (data.value !== selectedPoint?.value || data.x !== selectedPoint?.x || data.y !== selectedPoint?.y) {
      setSelectedPoint({ value: data.value, x: data.x, y: data.y });
    } else {
      setSelectedPoint({});
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSelectedPoint({});
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 20}
        height={240}
        chartConfig={chartConfig}
        style={styles.chartStyle}
        bezier
        onDataPointClick={handleDataPointClick}
      />
      {selectedPoint && (
        <View
          style={[
            styles.tooltip,
            { left: selectedPoint.x, top: selectedPoint.y + 10 },
          ]}
        >
          <Text style={styles.tooltipText}>{selectedPoint.value}</Text>
        </View>
      )}
    </View>
  );
};

export default LineChartModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  chartStyle: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  tooltip: {
    position: "absolute",
    zIndex: 100,
  },
  tooltipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
