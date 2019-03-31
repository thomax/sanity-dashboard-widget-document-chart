import sanityClient from 'part:@sanity/base/client'

const getCounts = (query, params) => sanityClient.listen(query, params, {events: ['create']})

module.exports = {
  getCounts
}
