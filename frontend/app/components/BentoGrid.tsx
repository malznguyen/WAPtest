import FeelsLikeCard from './FeelsLikeCard';
import WindCard from './WindCard';
import HourlyCard from './HourlyCard';
import DailyCard from './DailyCard';
import AIAlertCard from './AIAlertCard';

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FeelsLikeCard />
      <WindCard />
      <HourlyCard />
      <DailyCard />
      <AIAlertCard />
    </div>
  );
}
