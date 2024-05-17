import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamschemaComponent } from './ramschema.component';

describe('RamschemaComponent', () => {
  let component: RamschemaComponent;
  let fixture: ComponentFixture<RamschemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamschemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamschemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
