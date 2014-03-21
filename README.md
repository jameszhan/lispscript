#LispScript

An idea project for Lisp interpreter use javascript, and it build use node.js.

##install
To install the latest official version, use NPM:

```sh
npm install lispscript -g
```

To install the latest _bleeding edge_ version, clone this repository.


##usage

```sh
lispscript
```

```sh
> (car '(1 2 3))
1
> (cdr '(1 2 3))
[2, 3]

> ((((lambda (z) (lambda (y) (lambda (x) (- x y z)))) 2) 8) 15)
15
```




