const { writeFile, existsSync, mkdirSync } = require('fs');
// Configure Angular `environment.ts` file path
const _dir = './src/environments';
const path = `${_dir}/environment.ts`;
// Load node modules
const CColors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFileData = `export const environment = {
   url: '${process.env.API_BASE_URL}',
   apiUrl: '${process.env.API_URL}',
   quoteUrl: '${process.env.QUOTE_URL}',
   appName: '${process.env.APP_NAME}',
   awsPubKey: '${process.env.AWSKEY}',
   nodeEnv: '${process.env.NODE_ENV}',
   production: false
};
`;
console.log(
  CColors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
);
console.log(CColors.grey(envConfigFileData));
if (!existsSync(_dir)) {
  mkdirSync(_dir, 0o744);
}
writeFile(path, envConfigFileData, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      CColors.magenta(
        `Angular environment.ts file generated correctly at ${path} \n`
      )
    );
  }
});
