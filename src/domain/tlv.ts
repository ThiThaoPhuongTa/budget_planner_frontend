export class Tlv {
  tag: string;
  length: string;
  value: string;

  constructor(tag: string|number, value: string|number|object) {
    this.tag = tag.toString();
    this.length = value.toString().length.toString();
    this.value = value.toString()
  }

  toString() {
    return [this.tag.padStart(2, '0'), this.length.padStart(2, '0'), this.value].join('');
  }
}