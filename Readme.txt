https://github.com/ChainSafe/web3.js/issues/4090

This webpack file is configured to support crypto/web3 apps with react/webpack v5

install
npm i buffer process stream-browserify os-browserify stream-http https-browserify url




insert this in ->
webpack.config.js in react-scripts


      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      }),

below plugins like so:

////////////////////////////////

 plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],

//////////////////////////////

This might help find the relevant plugins:

//////////////////////////////////////////
 },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ].filter(Boolean),
    },
    plugins: [
//////////////////////////////////////////////////


Also insert this:

resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      url: require.resolve("url"),
      assert: require.resolve("assert"),
    },
  },


////////////////////////////////////////////////////
to help find:
///////////////
    }),
        ...(modules.webpackAliases || {}),
      },
      plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshRuntimeEntry,
          reactRefreshWebpackPluginRuntimeEntry,
          babelRuntimeEntry,
          babelRuntimeEntryHelpers,
          babelRuntimeRegenerator,
        ]),
      ],
      fallback: {
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url"),
        assert: require.resolve("assert"),
      },
    },
    module: {
