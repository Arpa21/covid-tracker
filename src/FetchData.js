import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

const url = `https://api.covid19api.com/summary`;

const FetchData = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await axios.get(url);
      setCountries(response.data.Countries);
      setIsLoading(false);
    }

    fetchCountryData();
  }, []);

  return (
    <>
      {isLoading? <h1 className="text-4xl text-center mt-32 text-white lg:text-8xl">Loading...</h1>
      : <section className="data grid grid-cols-1 gap-10 text-white p-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {countries.map(({ ID, Country, CountryCode, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Date}) =>
            <div key={ID} className="bg-gray-800 p-4 rounded">
              <h2 className="text-green-400 font-bold text-3xl mb-4">
                {Country}, <span className="font-light">{CountryCode}</span>
              </h2>
              <ul>
                <li className="my-2 flex justify-between text-red-300">
                  <span className="font-bold">New Confirmed Cases:</span>
                  {NewConfirmed}
                </li>
                <li className="my-2 flex justify-between text-blue-300">
                  <span className="font-bold">Total Confirmed Cases:</span>
                  {TotalConfirmed}
                </li>
                <li className="my-2 flex justify-between text-yellow-300">
                  <span className="font-bold">New Deaths:</span>
                  {NewDeaths}
                </li>
                <li className="my-2 flex justify-between text-purple-300">
                  <span className="font-bold">Total Deaths:</span>
                  {TotalDeaths}
                </li>
                <li className="my-2 flex justify-between text-indigo-300">
                  <span className="font-bold">New Recovered Cases:</span>
                  {NewRecovered}
                </li>
                <li className="my-2 flex justify-between text-pink-300">
                  <span className="font-bold">Total Recovered Cases:</span>
                  {TotalRecovered}
                </li>
                <li className="text-green-100 mt-5">
                  <span className="font-bold mr-2">Date:</span>
                  {moment(`${Date}`).format('MMM Do YYYY')}
                </li>
              </ul>
            </div>
          )}
        </section>}
    </>
  )
}

export default FetchData;
