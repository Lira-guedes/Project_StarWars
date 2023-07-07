const fetchApi = async () => {
  const responde = await fetch('https://swapi.dev/api/planets');
  const data = await responde.json();
  const planets = data.results.map((elem) => delete elem.residents);
  return planets;
};

export default fetchApi;
