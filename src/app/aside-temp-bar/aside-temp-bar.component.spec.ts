import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideTempBarComponent } from './aside-temp-bar.component';

describe('AsideTempBarComponent', () => {
  let component: AsideTempBarComponent;
  let fixture: ComponentFixture<AsideTempBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideTempBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideTempBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
