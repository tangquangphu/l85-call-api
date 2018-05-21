import React from 'react';

//Những Component nào sẽ xuất ra dựa trên route
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';
import Product from './pages/ProductDetail/Product';

const routes = [
    {
        path : "/",
        exact : true,
        main: () => <HomePage />
    },
    {
        path : "/product-list",
        exact : false,
        main: () => <ProductListPage />
    },
    {
        path : "/product/add",
        exact : false,
        main: ({history}) => <ProductActionPage history={history} />
    },
    {
        path : "/product/:id/edit",
        exact : false,
        main: ({match, history}) => <ProductActionPage match={match} history={history}/>
    },
    {
        path: "/product/:id",
        exact :false,
        main: ({match}) => <Product match={match}/>
    },
    {
        path : "",
        exact : false,
        main: () => <NotFoundPage />
    },
    
];

export default routes;