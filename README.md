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

```lisp
(car '(1 2 3))          ;;→ 1
(cdr '(1 2 3))          ;;→ [2, 3]
(cons 1 '(3 5 6))       ;;→ [1, 3, 5, 6]
(cons '(1 2) '(3 5 6))  ;;→ [[1, 2], 3, 5, 6]

((((lambda (z) (lambda (y) (lambda (x) (- x y z)))) 2) 8) 15)  ;; → 15

(define hello 100)
hello               ;;→ 100
(define (dup x) (* x 2))
(dup 3)             ;;→ 6

(define (fb x) (if (< x 2) 1 (* x (fb (- x 1)))))
(fb 10)             ;;→ 3628800

(cond ((+ 3 4)))                ;;→ 7
(cond ((> 3 4) 1) ((< 5 6) 2))  ;;→ 2
(cond ((> 3 4)))                ;;→ undefined

(define (classify x)
    (cond
        ((< x 0) "negative")
        ((< x 10) "small")
        ((< x 20) "medium")
        ((>= x 30) "big")))
(classify 15)           ;;→ 'medium'
(classify 22)           ;;→ undefined
(classify 100)          ;;→ "big"
(classify -10)          ;;→ "negative"

(map (lambda (x) (+ x 6)) '(1 2 3))             ;;→ [7, 8, 9]
(reduce (lambda (s x) (+ x s)) '(1 2 3) 10)     ;;→ 16
(filter (lambda (x) (> x 2)) '(1 2 3))          ;;→ [3]

(apply + '(1 2 3))                              ;;→ 6
```




