const fetchApi = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  return response;
};

export default fetchApi;
