import React from "react";
import { VictoryGroup, VictoryLine } from "victory"


const MovingAverages = ({indicator, data, update}) => {

    console.log(' update ' + update)


    return (
            <VictoryGroup>
                <VictoryLine 
                    style={{
                            data: { stroke: indicator.color },
                            parent: { border: "1px solid #ccc"}
                        }}
                    data={data}
                    x='x'
                    y='y'	
                    key={indicator.id}
                    />
            </VictoryGroup>
        )

}

export default MovingAverages