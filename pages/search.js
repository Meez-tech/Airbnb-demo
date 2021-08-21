import { format } from 'date-fns';
import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

function Search({ searchResults }) {
  //pull the query of the router to pass it as props from search input
  const router = useRouter();

  //Destructure the queries from router
  const { location, startDate, endDate, numberOfGuests } = router.query;

  //format start and end date, to display it userFriendly
  const formatStartDate = format(new Date(startDate), 'dd MMMM yy');

  const formatEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formatStartDate}- ${formatEndDate}`;

  return (
    <div className="h-screen">
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} Guests`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation preference</p>
            <p className="button">Type of Place</p>
            <p className="button">Rooms & Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={star}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              ),
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

//pre-render page from server
export async function getServerSideProps() {
  //fetch data from server and return json
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json(),
  );
  //pass response json to app via props
  return {
    props: {
      searchResults,
    },
  };
}
