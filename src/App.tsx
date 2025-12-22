import Landing from './landing'
import { BubbleBackground } from './components/animate-ui/components/backgrounds/bubble';

type BubbleBackgroundDemoProps = {
  interactive: boolean;
};



export const App = ({ interactive }: BubbleBackgroundDemoProps) => {

  const blueColors = {

    first: "10, 25, 47",
    second: "0, 51, 102",
    third: "25, 25, 112",
    fourth: "0, 71, 171",
    fifth: "30, 144, 255",
    sixth: "0, 0, 128",

  };

  return (
    <div className="relative min-h-screen w-full">
      <BubbleBackground
        interactive={interactive}
        className="absolute inset-0 flex items-center justify-center rounded-xl"
        colors={blueColors}
      />
      <div className="relative z-10">
        <Landing/>
      </div>
    </div>
  );
};