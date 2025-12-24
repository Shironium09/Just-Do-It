import Landing from './landing'
import { Upload } from './upload'
import SpaceBackground from './components/SpaceBackground'
import { Space } from 'lucide-react'

export const App = () => {

  return (
    <div className="relative min-h-screen w-full">
      <SpaceBackground speed={0.06} starCount={100}/>
      <div className="relative z-10">
        <Landing/>
        <Upload/>
      </div>
    </div>
  );
};