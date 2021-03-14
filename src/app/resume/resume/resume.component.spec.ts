import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeComponent } from './resume.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService, Signed } from '../../auth/auth.service';

const user: Signed = {
  signed: false,
  user: {
    singInStart: 1273321,
    tokenId: 'qwe213',
    userId: '123',
    refreshToken: 'abc123'
  }
}
const authServiceStub = {
  signedIn$: {
    value: user
  }
}
describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
