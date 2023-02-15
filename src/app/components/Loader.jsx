import {FoldingCube} from 'better-react-spinkit';

const Loader = () => (
    <div className="flex flex-col items-center justify-center py-24 w-full">
        <FoldingCube size={64} color='#000' />
        <span className="block pt-6 font-slab text-grey-900">Loading...</span>
    </div>
)

export default Loader;
