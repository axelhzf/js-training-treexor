# Treexor Javascript training

Content:
* Javascript gotchas
* Testing with Javascript: Mocha + chai
* ES6
* Functional programming
* Async programming
* Build tools: Webpack + gulp
* Flexbox
* React / React Router
* Landing Page Optimization
* Redux
* React Native


## Intro

Javascript es no es únicamente jQuery.

![](http://www.doxdesk.com/img/updates/20091116-so-large.gif)

Gracias a su popularidad debida a que es el lenguaje de la web, su uso se ha extendido a multiples plataformas:
* Aplicaciones de servidor: [NodeJS](https://nodejs.org/)
* Aplicaciones móviles: [React Native](https://facebook.github.io/react-native/)
* Aplicaciones de escritorio: [Electron](http://electron.atom.io/)
* Robotics and IoT: [Johnny Five](http://johnny-five.io)

## Requirements

* NodeJS: https://github.com/creationix/nvm

## Javascript gotchas

JavaScript tiene sus [partes buenas](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) y sus partes malas, por eso es importante que conozcamos cómo funciona el lenguaje.


### == vs ===

La principal diferencia entre el operador `==` y `===` es que el primero realiza conversión de tipos

````js
1 == 1     // true
1 === 1    // true
1 == '1'   // true
1 === '1'  // false
````

## Scope

Por defecto, el scope de las variables es global. Se definen en un objeto global, en que en el caso del navegador se llama `window`.

````js
a = 20;
console.log(a); //20
console.log(window.a); // 20
````

Si utilizamos `var` la variable se define en el ámbito de la función donde está contenido.

````js
var a = 'global';

function printLocal () {
    var a = 'local';
    console.log(a);
}

console.log(a); //global
printLocal(); //local
````

A diferencia de otros lenguajes de programación como Java, los bloques no definen un scope.

````js
function fn() {
    if(true) {
        var a = 10;
    }
    for(i = 0; i < 20; i++) {
        var b = i;
    }
    console.log(a);
    console.log(b);
}
fn();
// 10
// 19
````

Siempre debemos definir las variables utilizar `var` para evitar efectos colaterales al modificar variables global sin darnos cuenta

````js
var a = 'global';

function printLocal () {
    a = 'local';
    console.log(a);
}

console.log(a); //global
printLocal(); //local
console.log(a); //local
````

Para evitar la utilización de variables globales se suelen utilizar las 'self-invoking functions'. La forma de definirlas es

````js
(function () {
    var a = 'this is not global';
    console.log(a);
})();
````

Definiendo una función que se llama a si misma estamos consiguiendo definir un ámbito para que la variable a no esté definida en el scope global.

Es posible que cuando veas código de alguna librerías veas a que las 'self-invoking functions' le pasan parámetros, por ejemplo:

````js
(function( window, $, undefined ) {
    // code
})(window, jQuery);
````

## Funciones con número de parámetros variables

Todas las función definen dos parámetros por defecto: `this` y `arguments`. `arguments` contiene todos los parámetros que se han especificado al invocar una función, permitiendo implementar funciones con número de parámetros variables.


````js
function multipleArgs () {
    console.log(arguments);
}

multipleArgs(1, 2, 3, 4);
multipleArgs(1, 2, 3, 4, 5, 6);
````

Debido a un fallo de diseño, `arguments` es una variable de tipo array, pero no es realmente un array. Tiene una property length y se pueden acceder a los elementos con [], pero no tiene todos los métodos de un array.

````js
function multipleArgs () {
    console.log(arguments[0], arguments[1]);
    console.log(arguments.length);
    console.log(arguments.slice); //undefined
}

multipleArgs(1, 2, 3, 4);
multipleArgs(1, 2, 3, 4, 5, 6);
````

Si queremos convertir la variable `arguments` a un array podemos utilizar

````js
var args = Array.prototype.slice.call(arguments);
````

## First-class function

JavaScript soporta pasar como parámetros y devolver funciones.

Este es el modo imperativo de imprimir los elementos de un array.
````js
function printElements (array) {
    for (var i = 0; i < array.length ; i++) {
        console.log(array[i]);
    }
}
printElements([1, 2, 3]);
````

Si hicieramos una implementación funcional

````js
function forEach (array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}

function print(element) {
    console.log(element);
}

forEach([1, 2, 3], print);
````

En la implementación funcional estamos abstrayendo el recorrer un array en la función `forEach`, que recibe como segundo parámetro una función que es la que llamará en cada una de las iteraciones.

Las funciones como parámetros son clave en la programación asíncrona. Es muy común que las funciones que realizan tareas asíncronas reciban como parámetro una función que se invocará cuando haya terminado la tarea asíncrona. A este tipo de parámetro se le llama callbacks.

````js
function delayedAlert(callback) {
    setTimeout(function () {
        alert('hello');
        callback();
    }, 2000);
    console.log('finish delayed alert');
}

delayedAlert(function () {
    console.log('callback!');
});

// finish delayed alert
// Alert
// callback!
````

Las funciones pueden devolver funciones

````js
function counter() {
    var count = 0;
    return function() {
        console.log(count++);
    }
}
var count = counter();
count();
count();
count();
````

## Closure

Las funciones pueden acceder a todas las variables de la función donde fueron definidas (excepto this y arguments).

````js
function fn() {
  var name = "js-training";
  function innerFn() {
      console.log(name);
  }
  innerFn();
}
fn();
````

Un caso más interesante es cuando la inner function tiene un ciclo de vida mayor que la función que la englobal

````js
function counter() {
    var count = 0;
    return function() {
        console.log(count++);
    }
}
var count = counter();
count();
count();
count();
````

Este es un mecanismo que permite definir variables privadas, como la variable `count`.

Esta [herramienta](http://daniellmb.github.io/JavaScript-Scope-Context-Coloring/example/scope-coloring.html) hace un resaltado de sintaxis del código en función del scope.

## What it is "this"?

El parámetro `this` es muy importante en programación orientada a objetos y su valor está determinado por el patrón de invocación utilizado.
Existen cuatro patrones de invocación distintos en javascript: Method invocation pattern, function invocation pattern, constructor invocation pattern y apply invocation pattern.

##### Method invocation pattern

````js
var myObject = {
    increment : function () {

    }
}
myObject.increment();
// this == myObject
````

##### Function Invocation Pattern

````js
function add(a, b) {
    return a + b;
}
var sum = add(3, 4); // this == global object -> window
````

##### Constructor Invocation Pattern

Javascript es un lenguaje con herencia de prototype, esto quiere decir que un objeto puede heredar properties directamente de otro objeto.
Cuando una función se invoca utilizando el prefijo new, se crea un nuevo objeto y el valor de this apuntará a ese nuevo objeto.

````js
var Quo = function (string) {
    this.status = string;
};
Quo.prototype.get_status = function (  ) {
    return this.status;
};
var myQuo = new Quo("confused");
````

##### Apply Invocation Pattern

Los métodos `apply` y `call` permite invocar una función especificandole el valor que debe tener el this. La diferencia entre las dos funciones que la primera recibe un array con los parámetros mientras que la segunda recibe un número de parámetros variables.

````js
var parameters = [3, 4];
var sum = add(3, 4);

var thisObject = {};

var sum = add.apply(thisObject, [3, 4]);
var sum = add.call(thisObject, 3, 4);
````

## Problemas con this

El principal problema con this, es no saber qué valor tiene en cada momento.

````js
function counter() {
    var count = 0;
    return function() {
        console.log(count++);
    }
}
var count = counter();
count();
count();
````

Supongamos que queremos almacenar la variable `count` en this.

````js
var counter = {
    create : function () {
        this.count = 0;
        return function() {
            console.log(this.count++);
        }
    }
}
var count = counter.create();
count();
count();
````

Este código no va a funcionar. ¿Cual es el problema? El valor del this no es el mismo en las dos funciones.
Si quisieramos hacer esto, podríamos definir una variable local que almacenara el valor del this.

````js
var counter = {
    create : function () {
        this.count = 0;
        var self = this;
        return function() {
            console.log(self.count++);
        }
    }
}
var count = counter.create();
count();
count();
````

## Javascript testing

Para realizar los ejercicios vamos a hacer testing. De esta forma vamos a comprobar si nuestro código es correcto o no. Para haer testing vamos a utilizar 3 librerías:

* Mocha: Test runner
* Chai: Assertion library
* Sinon: Mock library


Una suite de test comienza con la llamada a la función `describe`. Cada uno de los test se definen llamando a la función `it`. Por ejemplo:

````js
describe('MiClass', function(){
    it('should have an amazing feature', function(){
        //assertions
    })
})
````

En los bloques describe se especifican funcionalidades y en los bloques it se especifica qué comportamiento debería tener. Los bloques describe se pueden anidar.

````js
describe('MiClass', function(){
    describe('amazing feature', function () {
        it("should works only if it's monday", function () {
            //assertions
        });
    })
})
````

Si queremos ejecutar un código antes de cada bloque `it` podemos utilizar la función `beforeEach`.

````js
describe('MiClass', function(){
    beforeEach(function () {

    })

    it("should return monday if it's monday", function () {
        //assertions
    });

    it("should return tuesday if it's tuesday", function () {
        //assertions
    });
})
````

Para definir las assertions vamos a utilizar chai. Estos son algunos de los métodos disponibles, en la [documentación](http://chaijs.com/api/bdd/) puedes consultar el resto.

````js
expect(foo).to.equal('bar');
expect('hello').to.equal('hello');
expect(foo).to.eql({ bar: 'baz' }); //deep equal
expect('test').to.be.a('string');
expect([1,2,3]).to.include(2);
expect(true).to.be.true;
expect(undefined).to.be.undefined;
expect(fn).to.throw(Error);
````

## Test doubles con SinonJS

[Sinon.js](http://sinonjs.org/docs/) nos provee tres tipos distintos de dobles para tests:

* Spy
* Stub
* Mocks

Los **Spy** graban los argumentos con que fue llamada una función y el valor de retorno. Nos permite hacer cosas como:


```js
 var callback = sinon.spy();
PubSub.subscribe("message", callback);
PubSub.publishSync("message");
expect(callback.called).to.be.true;

var spy = sinon.spy(obj, "method");
obj.method("arg1");
expect(spy.getCall(0).args[0]).to.equal("arg1")
```

Los *Stubs* se comportan como Spy pero permiten sustituir la función que están espiando.

```js
var stub = sinon.stub(obj, "method", function () {
    return "the method was replaced"
});
var result = obj.method();
expect(stub).to.be.true;
expect(result).to.equal("the method was replaced");
```

Los *Mocks* se comportan Stubs pero harán fallar los tests si no se usan como estaban programados.

```js
var mock = sinon.stub(obj, "method", function () {
    return "the method was replaced"
});
var result = obj.method();
mock.verify();
```

# Ejercicios

#### Map

La función map permite manipular los elementos de un array. Se parece a la función `forEach` que vimos anteriormente, pero `map` almacena el valor de la evaluación de todas las funciones mientras itera.

````js
it("map", function () {
    var multiplyByTwo = function (a) {
        return a * 2;
    };
    expect(map([1, 2, 3], multiplyByTwo)).to.eql([2, 4, 6]);
});
````

#### Curry

La función curry permite hacer una aplicación parcial de los elementos de una función.

````js
it("curry", function () {
    function add (x, y) {
        return x + y;
    }
    var inc = curry(add, 1);
    expect(inc(10)).to.equal(11);
    expect(inc(23)).to.equal(24);
});
````

#### Memoize

La función memoize permite crear una cache de las ejecuciones de una función. Cuando se invoca una función se almacena el resultado en una cache. Si la función se vuelve a llamar con los mismos parámetros, el resultado se obtiene de la cache en lugar de evaluar de nuevo la función.

````js
it("Memoize", function () {
    var multiplyByTwo = function (a) {
        return a * 2;
    };
    var multiplyByTwoSpy = sinon.spy(multiplyByTwo);
    var multiplyByTwoMemoized = memoize(multiplyByTwoSpy);

    expect(multiplyByTwoMemoized(1)).to.equal(2);
    expect(multiplyByTwoMemoized(1)).to.equal(2);

    expect(multiplyByTwoSpy.calledOnce).to.be.true;
});
````

## ES6/ES2015

ES6 añade muchas funcionalidades muy interesantes al lenguaje

https://github.com/lukehoban/es6features#readme

Muchas de estas funcionalidades ya están implementadas en la [última versión de NodeJS](http://node.green/).

Si queremos utilizar estas funcionalidades en el navegador, vamos a tener que utilizar un compilador que genere código compatible con todos los navegadores. Por ejemplo [Babel](https://babeljs.io/).

En la sección de build tools veremos como integrarlo.

## Functional programming

¿Podemos considerar JavaScript como un lenguaje funcional? Pues depende de la definición que utilicemos de lenguaje funcional. Si definimos un lenguaje funcional como aquel que tiene first class functions (las funciones se pueden utilizar como parámetros y como valores a devolver), entonces podemos considerar JavaScript como un lenguaje funcional. En cambio si incluimos en la definición conceptos como inmutabilidad o pattern matching, entonces JavaScript no es un lenguaje funcional.

> Functional programming is the use of functions that transform values into units of ab‐ straction, subsequently used to build software systems.


### ¿Por qué la programación funcional es importante?

¿Podrías decir a simple vista qué hace este código?

```js
var array = [1, 2, 3];
var results = [];
for (var i = 0; i < array.length; ++i) {
  var value = (array[i] * array[i]) + 1;
  if (value % 2 === 0) {
    results.push(value);
    if (results.length === 1) {
      break;
    }
  }
}
```

Vamos a reescribir el código de una forma funcional

```js
var array = [1, 2, 3];
var result = _.chain(array)
 .map(square)
 .map(inc)
 .filter(isEven)
 .head(1)
 .value();

function square(i) {
  return i * i;
}

function inc(i) {
  return i + 1;
}

function isEven(i) {
  return i % 2 === 0;
}
```

Tenemos un trozo de código más compacto y legible. Además hemos creados algunas funciones como square o inc que podremos reutilizar

## Ejercicio


```js
var clients = [
  {firstName: "Princess", lastName: "Hernández", balance: 50},
  {firstName: "Darth", lastName: "Vader", balance: -20},
  {firstName: "Luke", lastName: "Skywalker", balance: -30},
  {firstName: "Han", lastName: "Solo", balance: 100}
];

describe("functional", function () {

  it("should return the full name of client with balance < 0", function() {
    expect(badClients(clients)).to.eql(["Darth Vader", "Luke Skywalker"])
  });

});
```