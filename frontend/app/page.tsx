import Header from './components/Header';
import BentoGrid from './components/BentoGrid';
import ChatPanel from './components/ChatPanel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          <div className="w-[70%]">
            <BentoGrid />
          </div>
          <div className="w-[30%]">
            <ChatPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
