// incoming
// {
//   article: 144,
//   helpArticle: 55
// }

// outgoing
// [
//   {
//     name: 'article',
//     value: 144
//   },
//   {
//     name: 'helpArticle',
//     value: 55
//   }
// ]
const countsToChartData = counts => {
  return Object.keys(counts).map(key => ({name: key, value: counts[key]}))
}

module.exports = {
  countsToChartData
}
