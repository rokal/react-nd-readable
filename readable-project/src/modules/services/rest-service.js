const buildUrl = (initialUrl, id) => {
  if (id) {
    return `${initialUrl}/${id}`;
  }
  return initialUrl
}

export default class {
  constructor (baseUrl, apiClient) {
    this.apiClient = apiClient;
    this.baseUrl = baseUrl;
  }

  get = (id) => this.apiClient.get(buildUrl(this.baseUrl, id));

  save = (id, data) => {
    if (id) {
      return this.apiClient.put(buildUrl(this.baseUrl, id), data)
    }
    return this.apiClient.post(this.baseUrl, data)
  }

  delete = (id) => this.apiClient.delete(buildUrl(this.baseUrl, id));
}