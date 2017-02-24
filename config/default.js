/**
 * Created by Leslie on 2016/12/2.
 */
module.exports = {
  prot: 3000,
  session: {
    secret: 'zhaodashen',
    key: 'zhaodashen',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/zhaodashen',
  routePath: 'api' // api or views
};