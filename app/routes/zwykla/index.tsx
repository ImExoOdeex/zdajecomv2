/* eslint-disable no-lone-blocks */
import Layout from '~/components/Layout'
import { type ActionFunction, json, redirect } from '@remix-run/node';
import Index from '../../components/ZwyklaPage/index';
import { db } from '~/utils/db.server';
import subjects from '../../utils/subjects.json'
import { commitSession, getSession } from '../../utils/sessions'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    let content = form.get('average');
    //@ts-ignore
    content = Number(content);
    const subject = form.get('subject');
    let subjectName = form.get('subject');
    const errors = {};
    var valid = 0;
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

export default function IndexPage() {

    const location = useLocation();

    return (
        <motion.main key={location.key}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: 'tween', duration: .3 } }}
            exit={{ y: 20, opacity: 0, transition: { duration: .15 } }}
        >
            <Layout>
                <Index />
            </Layout>
        </motion.main>
    )
}