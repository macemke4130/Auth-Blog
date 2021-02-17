import * as React from 'react';
import Nav from '../components/Nav';

const FourOhFour = (props: FourOhFourProps) => {
    
    return (
        <>  
            <Nav />
            <h1>404 Not Found</h1>
        </>
    );
};

interface FourOhFourProps { }

export default FourOhFour;