import {useJsonData} from '@/app/utils/api';
import {useDataPath} from '@/app/hooks/paths';
import Loader from '@/app/components/Loader';

const ExamplePage = () => {
    const dataPath = useDataPath();

    const {data: data = [], isLoading, hasError} = useJsonData(
        dataPath('data.json')
    );

    if (hasError) {
        return <h1>Error!</h1>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <code>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
    )
}

export default ExamplePage;
