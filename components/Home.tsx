import React from 'react'
import { Text } from 'react-native'
import LineChartModal from "./charts/LineChartModal";

const Home = () => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [500, 450, 0, 800, 990, 500, 220];
    // const labels_2 = ["Week 1", "Week 2", "Week 3", "Week 4"];
    // const data_2 = [2200, 1800, 2400, 2000];
    return (
        <>
            <LineChartModal labels={labels} data={data} legend={["Monthly"]} />
        </>
    )
}

export default Home;

