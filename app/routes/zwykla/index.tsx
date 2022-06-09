import Layout from '~/components/Layout'
import { LinksFunction, MetaFunction } from '@remix-run/node';
import React, { useState, useEffect } from 'react';
import Index from '../../components/ZwyklaPage/index';

function index() {
    return (
        <>
            <Layout>
                <Index />
            </Layout>
        </>
    )
}

const average = 2;
export const meta: MetaFunction = () => ({
    title: `${average ? average : 'Zdajesz!'} | Zdaje.com`,
});


export default index