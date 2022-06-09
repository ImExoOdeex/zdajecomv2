import React, { useState } from 'react'

type Props = {}

const Index = (props: Props) => {
    const [average, setAverage] = useState(0);
    return (
        <>
            {average}
        </>
    )
}

export default Index