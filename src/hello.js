// There can only be one default export

export default function sayHello(name='John Doe') {
  console.log('Hello, ' + name);
}

// But there can be multiple named exports ...

export const PI = 3.14;

export function one(){
  return 1;
}

export function two(){
  return 2;
}

export class MagicBox {
  constructor(value=0){
    this.value = value;
  }

  whatIsInTheBox(){
    return this.value;
  }
}
