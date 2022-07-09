import type { NextPage } from 'next';
import Dropzone from '../components/dropzone';
import Posts from '../components/posts';

const Home: NextPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <Dropzone />
        </div>
        <div className="p-5 bg-gray-200 min-h-screen w-full">
          <Posts />
        </div>
      </div>
    </>
  );
};

export default Home;
