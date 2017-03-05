export default {
   port: process.env.PORT || 3000,
   db: {
       host: 'mongo',
       dev: {
           name: 'na44'
       },
       test: {
           name: 'devmain'
       }
   }
}
