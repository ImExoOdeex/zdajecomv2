import { type LoaderFunction, json, type MetaFunction } from '@remix-run/node';
import Index from '~/components/sredniaPage/Index';
import { db } from '~/utils/db.server';
import Layout from '../../components/Layout';
import invariant from "tiny-invariant";

type LoaderData = {
    averageList: Array<{ content: Number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

export const loader: LoaderFunction = async ({ params }) => {

    invariant(params, "");

    const data: LoaderData = {
        averageList: await db.average.findMany({
            // take 20 latest records
            take: 20,
            // order by descrementing id
            orderBy: {
                id: 'desc'
            }
        }),
    };
    const dataOne = await db.average.findFirst({
        take: 1,
        orderBy: {
            id: 'desc'
        }
    })
    return json({ data, dataOne });
};

export const meta: MetaFunction = () => {
    return {
        title: "Średnie | Zdaje.com",
    };
};



function index() {
    return (
        <Layout>
            <Index />
        </Layout >
    )
}

export default index