import React from 'react'
import Layout from '~/components/Layout'
import Index from '~/components/WazonaPage'
import { type ActionFunction, json, redirect } from '@remix-run/node';
import { db } from '~/utils/db.server';
import subjects from '../../utils/subjects.json'
import { commitSession, getSession } from '../../utils/sessions'


export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    let content = form.get('average');
    //@ts-ignore
    content = Number(content);
    const subject = form.get('subject');
    let subjectName = form.get('subject');
    const errors = {};
    var valid = 0;

    // eslint-disable-next-line no-lone-blocks
    {
        // eslint-disable-next-line array-callback-return
        subjects.map((s) => {
            if (s.slug === subject) {
                subjectName = s.name;
                valid += 1;
            }
        })
    }

    if (valid == 0) {
        //@ts-ignore
        errors.valid = "Podaj właściwy przedmiot.";
    }

    if (typeof content !== 'number' || typeof subject !== 'string' || typeof subjectName !== 'string' || subject.length === 0 || subjectName.length === 0 ||
        content === null) {
        throw new Error(`Form not submitted correctly.`);
    }

    if (content < 1 || content > 6) {
        //@ts-ignore
        errors.content = "Średnia może wynosić liczbę tylko w przedziale od 1 do 6."
    }

    if (Object.keys(errors).length) {
        return json(errors, { status: 422 });
    }

    const session = await getSession(
        request.headers.get("Cookie")
    );

    session.flash("success", true)

    const fields = { content, subject, subjectName };
    await db.average.create({ data: fields });
    return redirect(`/srednie/${subject}`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

function index() {
    return (
        <Layout>
            <Index />
        </Layout>
    )
}

export default index