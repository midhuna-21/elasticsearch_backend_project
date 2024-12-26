import client from "../server/src/utils/funtions/elasticsearch.js";

async function generateApiKeys() {
   const response = await client.security.createApiKey({
      body: {
         name: 'server',
         role_descriptors: {
           esrver_writer: {
             cluster: ['monitor'],
             index: [
               {
                 names: ['server'],
                 privileges: ['create_index', 'write', 'read', 'manage'],
               },
             ],
           },
         },
       },
   });
   return Buffer.from(`${response.id}:${response.api_key}`).toString('base64');
 }
 
 generateApiKeys()
   .then(console.log('api key generated'))
   .catch((err) => {
     console.error(err,'error');
     process.exit(1);
   });
 
 