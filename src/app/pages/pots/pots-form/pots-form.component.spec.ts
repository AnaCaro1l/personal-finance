import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsFormComponent } from './pots-form.component';

describe('PotsFormComponent', () => {
  let component: PotsFormComponent;
  let fixture: ComponentFixture<PotsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
