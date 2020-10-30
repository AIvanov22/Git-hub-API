const baseUrl = 'https://api.github.com';
const fetchGitApi = async (endpoint, options = {}) => {
  try {
    const res = await fetch(baseUrl + endpoint, {
      ...options
    })
    return res.json();
  } catch (err) {
    return Promise.reject(err);
  }
}

export const lookupRepositories = async (value, date, license, page, perPage = 100) => {
  return await fetchGitApi(
    `/search/repositories?q=${value} in:name created:>${date} license:${license}&per_page=${perPage}&page=${page}`, {
      method: 'GET'
    }
  );
}

export const fetchLicenses = async () => {
  return await fetchGitApi(
    `/licenses`, {
      method: 'GET'
    }
  );
}