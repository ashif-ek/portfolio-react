import { DotLottiePlayer } from '@dotlottie/react-player';
import loader from '../animations/loading.lottie';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <DotLottiePlayer
      src={loader}
      autoplay
      loop
      style={{ width: 500, height: 500 }}
    />
  </div>
);

export default LoadingSpinner;
