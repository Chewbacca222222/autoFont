# autoFont

### Installation instructions

Simply include `autoFont.min.js` at the bottom of your html document, the css will automatically generate as it is only a few lines.

### How to use

I’ve included an example document which demonstrates a couple of use cases.

To start, any text element that you would like to resize needs to have the class of `autoFontFill` on it, by using this class the text element will now automatically fill the parent element. For example:

```sh
<h1 class="autoFontFill">The quick brown fox jumps over the lazy dog.</h1>
```

#### Options

To add a minimum font size to an element use `data-autoFont-min=""`, this will stop the font size from reducing at whatever size specified. For example:

```sh
<h1 class="autoFontFill" data-autoFont-min="10">The quick brown fox jumps over the lazy dog.</h1>
```

For a maximum font size its `data-autoFont-max=""`, this will stop the font size from increasing at whatever size specified. For exmaple:

```sh
<h1 class="autoFontFill" data-autoFont-max="100">The quick brown fox jumps over the lazy dog.</h1>
```

By default the text will fill 100% of the available space, if you wanted to fill, for example only 50% use  `data-autoFont-width=""`, this will only allow the font to take up X% of the space. For example:

```sh
<h1 class="autoFontFill" data-autoFont-width="50">The quick brown fox jumps over the lazy dog.</h1>
```

To edit the poll rate (effectively changing the amount of times it runs during a resize event) use the following in a JS file, placed before the `autoFont.min.js` file:

```sh
var autoFontResizeRate = 100;
```

If your site is running slow increase this number (reducing the amount of times), or if you want a smoother resize then reduce it.

### Limitations

If the text element's parent is `<body>` then use `overflow-x: hidden` otherwise the document can be pushed out of the viewport.

If the text size affects the document so that scrolling is now introduced, the font can be slightly larger or smaller, but this is only in a very few use cases.

### Feedback

Spot any bugs? Want a new feature adding? Just drop me a message, would love to help :heart:
