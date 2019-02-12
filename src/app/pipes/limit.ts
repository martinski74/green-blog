import { Injectable, Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'limit'
})
@Injectable()
export class Limit implements PipeTransform {
  constructor() {}
  transform(value: string, stringLimit: number): any {
    console.log(stringLimit)
    if (value.length > stringLimit) {
      value = value.substring(0, stringLimit)+ '...'
    }
    return value
  }
}
