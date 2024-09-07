import Activities from "@/components/señal-comunicacion/Activities";

type Params = {
    categoria: string;
};

export async function generateStaticParams(): Promise<Params[]> {
    return [
        { categoria: 'cocina' },
        { categoria: 'bano' },
        { categoria: 'habitacion' },
        { categoria: 'emociones' },
        { categoria: 'entretenimiento' },
        { categoria: 'comunicacion' },
    ];
}

type Props = {
    params: Params;
};

const Page = ({ params }: Props) => {
    return (
        <Activities categoria={params.categoria} />
    );
};

export default Page;