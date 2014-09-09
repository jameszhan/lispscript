Scheme的优美之处就在于我们只需要六种特殊形式，以及另外的三种语法构造——变量、常量和过程调用。

<table>
<tr><th>形式(Form)</th><th>语法</th><th>语义</th><th>示例</th></tr>
<tr>
	<td>变量引用</td>
	<td>var</td>
	<td>一个符号，被解释为一个变量名；其值就是这个变量的值。</td>
	<td>x</td>
</tr>
<tr>
	<td>常量字面值</td>
	<td>number</td>
	<td>数字的求值结果为其本身</td>
	<td>12 或者-3.45e+6</td>
</tr>
<tr>
	<td>引用</td>
	<td>(quote exp)</td>
	<td>返回exp的字面值；不对它进行求值。</td>
	<td>(quote (a b c)) ⇒ (a b c)</td>
</tr>
<tr>
	<td>条件测试</td>
	<td>(if test conseq alt)</td>
	<td>对test进行求值；如果结果为真，那么对conseq进行求值并返回结果；否则对alt求值并返回结果。</td>
	<td>(if (< 10 20) (+ 1 1) (+ 3 3)) ⇒ 2</td>
</tr>
<tr>
	<td>赋值</td>
	<td>(set! varexp)</td>
	<td>对exp进行求值并将结果赋给var，var必须已经进行过定义 (使用define进行定义或者作为一个封闭过程的参数)。</td>
	<td>(set! x2 (* x x))</td>
</tr>
<tr>
	<td>定义</td>
	<td>(define varexp)</td>
	<td>在最内层环境 (environment) 中定义一个新的变量并将对exp表达式求值所得的结果赋给该变量。</td>
	<td>(define r 3) 或者 (define square (lambda (x) (* x x)))</td>
</tr>
<tr>
	<td>过程</td>
	<td>(lambda(var…)exp)</td>
	<td>创建一个过程，其参数名字为var…，过程体为相应的表达式。</td>
	<td>(lambda (r) (* 3.141592653 (* r r)))</td>
</tr>
<tr>
	<td>(表达式) 序列</td>
	<td>(beginexp…)</td>
	<td>在最内层环境 (environment) 中定义一个新的变量并将对exp表达式求值所得的结果赋给该变量。</td>
	<td>(define r 3) 或者 (define square (lambda (x) (* x x)))</td>
</tr>
<tr>
	<td>定义</td>
	<td>(define varexp)</td>
	<td>按从左到右的顺序对表达式进行求值，并返回最终的结果。</td>
	<td>(begin (set! x 1) (set! x (+ x 1)) (* x 2)) ⇒ 4</td>
</tr>
<tr>
	<td>过程调用</td>
	<td>(proc exp…)</td>
	<td>如果proc是除了if, set!, define, lambda, begin,或者quote之外的其它符号的话，那么它会被视作一个过程。它的求值规则如下：所有的表达式exp都将被求值，然后这些求值结果作为过程的实际参数来调用该相应的过程。</td>
	<td>(square 12) ⇒ 144</td>
</tr>
</table>

#####Lisp七大公理
1. quote    (quote x)返回x，我们简记为'x
2. atom     (atom x)当x是一个原子或者空表时返回原子t，否则返回空表()。在Lisp中我们习惯用原子t表示真，而用空表()表示假。
3. eq       (eq x y)当x和y的值相同或者同为空表时返回t，否则返回空表()
4. car      (car x)要求x是一个表，它返回x中的第一个元素
5. cdr      (cdr x)同样要求x是一个表，它返回x中除第一个元素之外的所有元素组成的表
6. cons     (cons x y)要求y是一个表，它返回一个表，这个表的第一个元素是x，其后是y中的所有元素
7. cond     (cond (p1 e1) (p2 e2)...(pn en)) p1到pn为条件，e1到en为结果，cond操作符依次对p1到pn求值，直到找到第一个值为原子t的p，此时把对应的e作为整个表达式的值返回

#####Lisp常见概念
* cons (construct)
* car (Contents of the Address part of the Register)
* cdr (Contents of the Decrement part of the Register)

#####S表达式用以下规则把列表转换成字符串
1. cons单元中，car的值和cdr的值用点相连，再用括号括起来。
2. cdr如果是列表的话，省略括号。
3. 末尾的cdr如果是nil，那么省略nil。

**Lisp中的每个节点，历史上称为cons单元。**



