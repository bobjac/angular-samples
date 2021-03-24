import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-example-component-library',
  template: `
    <p>
      example-component-library works!
    </p>
  `,
  styles: [
  ]
})
export class ExampleComponentLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
