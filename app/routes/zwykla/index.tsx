import Layout from '~/components/Layout'
import { json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import React, { useState, useEffect } from 'react';
import Index from '../../components/ZwyklaPage/index';
import { useLoaderData } from '@remix-run/react';
import { Index as IndexType } from '../../components/ZwyklaPage/index';

function index() {
    return (
        <>
            <Layout>
                <Index />
            </Layout>
        </>
    )
}

export const loader: LoaderFunction = ({ average }: any) => {
    const averageTitle = 1;

    return json({ average: averageTitle });
}


export const meta: MetaFunction = ({ data }) => {
    if (!data) {
        return {
            title: "Zwykła | Zdaje.com",
        };
    }
    return {
        title: `${data.average} | Zdaje.com`,
    };
};





export default index