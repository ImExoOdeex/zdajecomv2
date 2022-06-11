import Layout from '~/components/Layout'
import { json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
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

export default index