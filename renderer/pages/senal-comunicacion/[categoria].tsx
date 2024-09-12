import { GetStaticPaths, GetStaticProps } from 'next';
import Activities from '../../components/señal-comunicacion/Activities';

type Params = {
    categoria: string;
};

type Props = {
    categoria: string;
};

const Page = ({ categoria }: Props) => {
    return (
        <Activities categoria={categoria} />
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { categoria: 'cocina' } },
            { params: { categoria: 'bano' } },
            { params: { categoria: 'habitacion' } },
            { params: { categoria: 'emociones' } },
            { params: { categoria: 'entretenimiento' } },
            { params: { categoria: 'comunicacion' } },
        ],
        fallback: false, // can also be true or 'blocking' based on your needs
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const { categoria } = context.params!;

    return {
        props: {
            categoria,
        },
    };
};

export default Page;
