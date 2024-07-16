import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const LiveMatch = () => {
  const router = useRouter();
  const { id } = router.query;

  // Mock data for demonstration
  const matchDetails = {
    id: 1,
    teamA: 'Real Madrid',
    teamB: 'Barcelona',
    scoreA: 0,
    scoreB: 0,
    liveUrl: 'https://example.com/live1', // Replace with actual live stream URL
  };

  if (!id) {
    return (
      <Layout>
        <div className="max-w-full sm:max-w-4xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mt-8">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-full sm:max-w-4xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {matchDetails.teamA} vs {matchDetails.teamB}
        </h2>
        <div className="mb-4">
          <p>Live Stream:</p>
          <iframe
            src={matchDetails.liveUrl}
            width="100%"
            height="500px"
            allowFullScreen
            className="border rounded-lg"
            title="Live Match"
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Score:</h3>
            <p className="text-xl font-bold">
              {matchDetails.teamA}: {matchDetails.scoreA} - {matchDetails.scoreB} :{matchDetails.teamB}
            </p>
          </div>
          <div>
            <a
              href={matchDetails.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Open in New Tab
            </a>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LiveMatch;
