import Layout from './../components/Layout';
import Index from '~/components/IndexPage/Index';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';


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
  );
}
