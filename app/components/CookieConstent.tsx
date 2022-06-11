import React from 'react'
import { Button, Flex } from '@chakra-ui/react';
import { userPrefs } from '../components/Cookies';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type Props = {}

export async function loader({ request }: any) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    return json({ showBanner: cookie.showBanner });
}

export async function action({ request }: any) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    const bodyParams = await request.formData();
    if (bodyParams.get("bannerVisibility") === "hidden") {
        cookie.showBanner = false;
    }
    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

function CookieConstent() {

    const { showBanner } = useLoaderData();

    return (
        <>
            <Flex pos={'fixed'} bottom='0' left='0' w={'400px'} h='300px' bg='red.500'>
                banner cookie

                <Button>wdawd</Button>
            </Flex>
        </>
    )
}

export default CookieConstent