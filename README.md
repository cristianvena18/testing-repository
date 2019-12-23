# Ejercicio integrador

## Problema

Supongamos que los pedidos de la aplicación del ejercicio 1 se exportan a archivos de texto con el siguiente formato:

```
Producto    Cantidad    Precio  Total
Tomates     2 gr        $1.20    $2.4 
Lechuga     1 kg        $3.30    $3.3 
Ajo         3 unidades  $7.10    $21.3    
Total:                           $27
```

En otro proceso se parsea este archivo para generar el objeto

```
const order = {
    items: [
        {
            product: 'Tomates',
            quantity: {
                amount: 2,
                units: 'gr',
            },
            price: {
                amount: 1.20,
                currency: '$',
            },
            subtotal: {
                amount: 2.40,
                currency: '$',
            },
        },
        {
            product: 'Lechuga',
            quantity: {
                amount: 1,
                units: 'kg',
            },
            price: {
                amount: 3.30,
                currency: '$',
            },
            subtotal: {
                amount: 3.30,
                currency: '$',
            },
        },
        {
            product: 'Ajo',
            quantity: {
                amount: 3,
                units: 'units',
            },
            price: {
                amount: 7.10,
                currency: '$',
            },
            subtotal: {
                amount: 21.3,
                currency: '$',
            },
        },
    ],
    total: {
        amount: 27.00,
        currency: '$',
    },
}
```

y procesarlo.


El espaciado en el archivo de texto puede estar con tabs o con espacios y no siempre es regular en todas las líneas.

El archivo puede tener la forma


```
Producto Cantidad Precio Total
Tomates 2 gr $1.20 $2.4 
Lechuga 1 kg $3.30  $3.3 
Ajo 3 unidades $7.10 $21.3    
Total: $27
```

y también

```
Producto  Cantidad                Precio Total
Tomates  2 gr    $1.20    $2.4 
Lechuga   1 kg   $3.30       $3.3 
Ajo  3   unidades    $7.10   $21.3    
Total:        $27
```

Los productos pueden componerse por más de una palabra y pueden tener espacios y otros caracteres:

```
Producto  Cantidad   Precio   Total
Tomate redondo  2 gr    $1.20    $2.4 
Lechuga  mantecosa  1 kg   $3.30       $3.3 
Ajo  3   unidades    $7.10   $21.3    
Total:        $27
```

Los precios puede ser expresados en $ o USD, pueden ir delante o detrás del número y pueden estar
separados del número por espacios:

```
Producto  Cantidad   Precio   Total
Tomates  2 gr    1.20$    $2.4 
Lechuga   1 kg   $3.30       3.3 $ 
Ajo  3   unidades    UDS 7.10   UDS 21.3    
Total:        $ 27
```

La etiqueta del precio total puede ser alguna de las siguientes:

```
Total:        $ 27
Total   27$
```

y puede expresarse en minúsculas, mayúsculas o cualquier combinación de ambas.

## Solución buscada

Una manera de parsear estos archivos de texto es usando Regular Expressions.

En el archivo `main.js` hay un programa de ejemplo que parsea el archivo de texto con regular expressions que tienen esta forma:


```javascript
/^Total:\s*(?:(\$|USD)\s*(\d+(?:\.\d+)?))|(?:(\d+(?:\.\d+)?)\s*(\$|USD))$/i
```

Estas regex no son simples de interpretar, de modificar ni de debuguear y son muy propensas
a contener errores.


El problema propuesto consiste en diseñar un DSL para expresar el formato de líneas esperado
de manera más clara y simple pero compilando ese DSL a regular expressions.

Un ejemplo de un lenguaje así podría ser el siguiente:


```javascript
const totalLineMatcher = new CustomLineParser(
    '{Total}{{:}} [ space ] [ price => @total ]'
)
```

donde

- {Total} compila a la regex /Total:/ y matchea el string literal.

- {{:}} compila a la regex /\:?/ y matchea el string opcional ':'.

- [ space ] compila a la regex /\s+/ y matchea 1 o más espacios.

- [ price ] compila a la regex (?:(\$|USD)\s*(\d+(?:\.\d+)?))|(?:(\d+(?:\.\d+)?)\s*(\$|USD)) y matchea
un número y una moneda.

- [ expressionName => @keyName ] compila la `expressionName` definida previamente y deja el resultado en una prop del resultado llamada `keyName`, por ejemplo


```javascript
const totalLineMatcher = new CustomLineParser(
    '{Total}{{:}} [ space ] [ price => @total ]'
)

const matched = totalLineMatcher.exec( line )

matched.total == {
    amount: 27.43,
    currency: '$',
}
```

Otras construcciones para este DSL podrían ser:

- [ text ] compila a la regex /.+/ y matchea un texto no vacío
- [[ text ]] compila a la regex /.*/ y matchea un texto opcional
- [[ space ]] compila a la regex /\s*/ y matchea 0 o más espacios.
- [ integer ] compila a la regex /(?:\d+)/
- [ number ] compila a la regex /(?:\d+(?:\.\d+)?)/
- [ currency ] compila a la regex /(?:\$|USD)/


Este DSL es únicamente una solución propuesta pero cualquier diseño que compile a regular expressions sería correcto.

Usar TDD para resolver este tipo de problemas simplifica, ordena y mejora mucho las soluciones.

La sugerencia es usar TDD y reescribir la solución de `main.js` en un lenguaje específico más claro y simple.

## Entregables

1 - Un archivo `solution.js` que parsee correctamente el input `sample-1.txt`.
2 - Una implementacion de la clase `ExpressionParser` que use el DSL diseñado sobre regex.
3 - Un test suite que testee el parseo esperado de `ExpressionParser`.