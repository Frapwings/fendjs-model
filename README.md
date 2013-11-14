# fendjs-model

[![Build Status](https://travis-ci.org/Frapwings/fendjs-model.png?branch=master)](https://travis-ci.org/Frapwings/fendjs-model)

  Minimalistic extensible model component for Fend.js.

## API

### Modeler(name)

  Create a new model with the given `name`.

```js
var Modeler = require('fendjs-model');
var User = Modeler('User');
```

### Modeler.use(fn)

    Use the given plugin `fn()` on all model.
    
```js
var Modeler = require('fendjs-model');
Modeler.use(function (Model) {
  Model.attr('created_at', { type: 'date' });
  Model.attr('updated_at', { type: 'date' });
});
```

### Model.attr(name, [meta])

  Define an attribute `name` with optional `meta` data object.

```js
var Modeler = require('fendjs-model');

var Post = Modeler('Post')
  .attr('id')
  .attr('title')
  .attr('body')
  .attr('created_at')
  .attr('updated_at')
```

  With meta data used by plugins:

```js
var Modeler = require('fendjs-model');

var Post = Modeler('Post')
  .attr('id', { required: true, type: 'number' })
  .attr('title', { required: true, type: 'string' })
  .attr('body', { required: true, type: 'string' })
  .attr('created_at', { type: 'date' })
  .attr('updated_at', { type: 'date' })
```

### Model.validate(fn)

  TODO: validation callback docs

### Model.use(fn)

  Use the given plugin `fn()`.

```js
var Modeler = require('fendjs-model');
var Post = Modeler('Post')
Post.use(function (Model) {
  Model.attr('created_at', { type: 'date' });
  Model.attr('updated_at', { type: 'date' });
});
```

### Model.url([path])

  Return base url, or url to `path`.

```js
User.url()
// => "/users"

User.url('add')
// => "/users/add"
```

### Model.route(path)

  Set base path for urls.
  Note this is defaulted to `'/' + modelName.toLowerCase() + 's'`

```js
User.route('/api/u')

User.url()
// => "/api/u"

User.url('add')
// => "/api/u/add"
```
 
### Model.headers({header: value})

  Sets custom headers for static and method requests on the model.

```js  
User.headers({
  'X-CSRF-Token': 'some token',
  'X-API-Token': 'api token 
});
```

### Model.get(id, fn)

  TODO: get docs

### Model.all(fn)

  TODO: all docs

### Model.destroyAll(fn)

  TODO: destroyall docs

### Model#ATTR()

  "Getter" function generated when `Model.attr(name)` is called.

```js
var Post = Modeler('Post')
  .attr('title')
  .attr('body')

var post = new Post;
post.title('Ferrets')
post.body('Make really good pets')
```

### Model#ATTR(value)

  "Setter" function generated when `Model.attr(name)` is called.

```js
var Post = Modeler('Post')
  .attr('title')
  .attr('body')

var post = new Post({ title: 'Cats' });

post.title()
// => "Cats"

post.title('Ferrets')
post.title()
// => "Ferrets"
```

  - Emits "change" event with `(name, value, previousValue)`.
  - Emits "change ATTR" event with `(value, previousValue)`.

```js
post.on('change', function(name, val, prev){
  console.log('changed %s from %s to %s', name, prev, val)
})

post.on('change title', function(val, prev){
  console.log('changed title')
})

```

### Model#primary(val)

  TODO: primary docs

### Model#isNew()

  Returns `true` if the model is unsaved.

### Model#toJSON()

  Return a JSON representation of the model (its attributes).

### Model#has(attr)

  Check if `attr` is non-`null`.

### Model#get(attr)

  Get `attr`'s value.

### Model#set(attrs)

  Set multiple `attrs`.

```js
user.set({ name: 'Tobi', age: 2 })
```

### Model#changed([attr])

  Check if the model is "dirty" and return an object
  of changed attributes. Optionally check a specific `attr`
  and return a `Boolean`.

### Model#error(attr, msg)

  Define error `msg` for `attr`.

### Model#isValid()

  Run validations and check if the model is valid.

```js
user.isValid()
// => false

user.errors
// => [{ attr: ..., message: ... }]
```

### Model#url([path])

  Return this model's base url or relative to `path`:

```js
var user = new User({ id: 5 });
user.url('edit');
// => "/users/5/edit"
```

### Model#save(fn)

  Save or update and invoke the given callback `fn(err)`.

```js
var user = new User({ name: 'Tobi' })

user.save(function(err){

})
```

  Emits "save" when complete.

### Model#destroy([fn])

  Destroy and invoke optional `fn(err)`.

  Emits "destroy" when successfully deleted.

## Testing

```
$ npm install
$ make test-phantomjst 
```

# License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Frapwings/fendjs-model/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Frapwings/fendjs-model/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

