import React from 'react';
import {FormattedMessage} from 'react-intl';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

import Loader from '@/app/components/Loader';
const ExamplePage = React.lazy(() => import('@/app/pages/ExamplePage'));

const ExampleWidget = () => {
    return (
        <div>
            <h1>
                <FormattedMessage id="app.title"/>
            </h1>
            <Router>
                <Routes>
                    <Route index path="/" element={
                        <React.Suspense fallback={<Loader />}>
                            <ExamplePage/>
                        </React.Suspense>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default ExampleWidget;
