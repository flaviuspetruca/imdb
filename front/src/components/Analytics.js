import React from 'react';
import BooksChart from './BooksChart';
import RatingsChart from './RatingsChart';

const Analytics = () => {
    return (
        <div className="book-wrapper">
            <div className="book-inner">
                <h1>Analytics</h1>
                <RatingsChart/>
                <BooksChart/>
            </div>
        </div>
    )
}
 
export default Analytics;