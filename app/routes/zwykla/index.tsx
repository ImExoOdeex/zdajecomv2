import Layout from '~/components/Layout'
import { ActionFunction, redirect } from '@remix-run/node';
import Index from '../../components/ZwyklaPage/index';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    let content = form.get('average');
    //@ts-ignore
    content = Number(content);
    const subject = form.get('subject');
    let subjectName = form.get('subject');
    //@ts-ignore
    subjectName = subject.toString().replace('-', ' ').toLocaleUpperCase();

    if (typeof content !== 'number' || typeof subject !== 'string' || typeof subjectName !== 'string' || subject.length === 0 || subjectName.length === 0 ||
        content === "NaN") {
        throw new Error(`Form not submitted correctly.`);
    }
    const fields = { content, subject, subjectName };
    await db.average.create({ data: fields });
    return redirect(`/srednie`);
}

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