module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
    };
  };
// module.exports = function(api) {
//     api.cache(true);
//     return {
//       presets: ['babel-preset-expo'],
//       plugins: ['nativewind/babel'],
//     };
//   };

// module.exports = function(api) {
//     api.cache(true);
//     return {
//       presets: ['babel-preset-expo'],
//       plugins: [
//         'nativewind/babel'
//       ],
//     };
//   };

// module.exports = function(api) {
//     api.cache(true);
//     return {
//       presets: ['babel-preset-expo'],
//       plugins: [
//         ['nativewind/babel', { mode: 'transformOnly' }]
//       ],
//     };
//   };

//   module.exports = function (api) {
//     api.cache(true);
//     return {
//       presets: ['babel-preset-expo'],
//       plugins: ['nativewind/babel'],
//     };
//   };