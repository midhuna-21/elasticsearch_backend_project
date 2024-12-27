import { Client } from '@elastic/elasticsearch';
import config from '../../config/config.js';

const client = new Client({
  cloud: {
    id: config.CLOUD_ID,
  },
  auth: {
    username: config.USER_NAME,
    password: config.ELASTIC_PASSWORD
  },
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

export default client;
