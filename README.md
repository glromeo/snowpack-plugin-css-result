# snowpack-plugin-css-result

This plugin is just a quick stab at getting css results to be imported as lit-element styles.
It has many limitations due to the way snowpack manages plugins extension mapping at this time
but it gets the job done.

> **e.g.** why `.js` and not `.css.js` ?
I wanted `.scss` files to be imported as `.css.js` but it just doesn't work if I specify anything else than `.js`
as target extension. Until snowpack gets more flexible I'll have to get on with it...

### Usage
Have a look at the [example](https://github.com/glromeo/snowpack-plugin-css-result/tree/master/example)

### Options
`include` & `exclude` - a file that matches include and doesn't match exclude will be exported as `css result` 
  otherwise will be loaded as `style` element.

`basedir` - the files are matched for include & exclude relative to this directory (defaults to process.cwd())

example, given:
```
include: "src/components/**",
exclude: "**/*.css"
```
then
```
src/components/style.scss -> exported
src/components/misc.css -> loaded
src/global.scss -> loaded
```

This plugin passes through its options to `@snowpack/sass-plugin`.

