mailer
======

Send emails with Mailgun via the command line or other js applications.

install
-------

### production (doesn't currently exist)

```bash
$ npm install mailer
```

### development (use this one)

```bash
$ git clone https://github.com/kirbyk/mailer.git
$ cd mailer
$ npm install
$ npm link
```

usage
-----

### command line

```bash
$ MAILGUN_API_KEY="XXXXXXXXXX"
$ mailer --config example/config.yaml
```

*example/config.yaml*

```yaml
domain: 'kirby.xyz'
from: 'Kirby <hi@kirby.xyz>'
to: 'email@example.com'
subject: 'Hello'
html: 
  file: 'email.html'
text:
  file: 'email.txt'
```

*example/email.html*

```html
<h1>Hello world!<h1>
```

*example/email.txt*

```html
Hello world!
```

### code

```js
const mailer = require('mailer');

const options = {
  domain: 'kirby.xyz',
  from: 'Kirby <hi@kirby.xyz>',
  to: 'email@example.com',
  subject: 'Hello',
  html: {
    inline: '<h1>Hello world!</h1>'
  },
  text: {
    inline: 'Hello world!'
  },
};

mailer(options, (err, info) => {
  if (err) {
    return console.error(err.toString());
  }
  return console.log('Response: ' + JSON.stringify(info));
});
```
