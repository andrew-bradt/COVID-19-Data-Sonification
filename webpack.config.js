const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const audioFileList = (()=>{
  const fileList = fs.readdirSync(path.join(__dirname,'public','audio'));
  const fileListWithPath = fileList.map(fileName=>`${__dirname}/${fileName}`);
  return JSON.stringify(fileListWithPath);
})();
const rootConfig = {
  mode: 'development',
  optimization: {
    usedExports: true, // tells webpack to tree-shake
  },
  devtool: 'eval-source-map',
  
};

const appConfig = {
  ...rootConfig,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
  plugins:[
    new webpack.DefinePlugin({
      __FILELIST__:audioFileList
    },[path.join(__dirname,'public','audio')])
  ]
};

module.exports = appConfig;
