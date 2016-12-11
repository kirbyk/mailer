#! /usr/bin/env node
const fs = require('fs');
const jsyaml = require('js-yaml');
const mailer = require('../index.js');
const path = require('path');
const program = require('commander');


program
  .version(require('../package.json').version)
  .usage('[options]')
  .option('-c, --config <config>', 'mailer configuration file in YAML format')
  .parse(process.argv);

// no arguments passed
if (process.argv.length === 2) {
  console.log(program.help());
  process.exit(0);
}

fs.readFile(program.config, (err, data) => {
  options = jsyaml.load(data.toString());

  options = loadHtml(options);
  options = loadText(options);

  mailer(options, (err, info) => {
    if (err) {
      return console.error(err.toString());
    }
    return console.log('Response: ' + JSON.stringify(info));
  });
});

const getPath = (filename) => {
  return path.join(path.dirname(program.config), filename);
};

const loadHtml = (options) => {
  if (options.html.file) {
    const path = getPath(options.html.file);
    options.html = fs.readFileSync(path).toString();
  }

  if (options.html.inline) {
    options.html = options.html.inline;
  }

  return options;
};

const loadText = (options) => {
  if (options.text.file) {
    const path = getPath(options.text.file);
    options.text = fs.readFileSync(path).toString();
  }

  if (options.text.inline) {
    options.text = options.text.inline;
  }

  return options;
};
