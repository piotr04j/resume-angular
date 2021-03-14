import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router, UrlSegment } from '@angular/router';


describe('AuthGuradGuard', () => {
  let guard: AuthGuard;
  let routerMock = { navigateByUrl: jasmine.createSpy('aa') }
  const authServiceStub = {
    authStatus: true,
    checkAuthState() {
      return this.authStatus;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: AuthService, useValue: authServiceStub },
          { provide: Router, useValue: routerMock },
        ]
    });
    guard = TestBed.inject(AuthGuard);
    routerMock.navigateByUrl.calls.reset();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should pass canActive', () => {
    let routeMock: any = { snapshot: {} };
    let routeStateMock: any = { snapshot: {}, url: '/' };
    authServiceStub.authStatus = true;
    expect(guard.canActivate(routeStateMock, routeMock)).toBeTrue();
    expect(routerMock.navigateByUrl).toHaveBeenCalledTimes(0);
  });

  it('should not pass canActive', () => {
    let routeMock: any = { snapshot: {} };
    let routeStateMock: any = { snapshot: {}, url: '/' };
    authServiceStub.authStatus = false;
    expect(guard.canActivate(routeStateMock, routeMock)).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledTimes(1);

  });

  it('should pass canLoad', () => {
    let routeMock: any = { snapshot: {} };
    let urlSegmentMock: any = { snapshot: {}, url: '/' };
    authServiceStub.authStatus = true;
    expect(guard.canLoad(routeMock, urlSegmentMock)).toBeTrue();
    expect(routerMock.navigateByUrl).toHaveBeenCalledTimes(0);

  });

  it('should not pass canLoad', () => {
    let routeMock: any = { snapshot: {} };
    let urlSegmentMock: any = { snapshot: {}, url: '/' };
    authServiceStub.authStatus = false;
    expect(guard.canLoad(routeMock, urlSegmentMock)).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledTimes(1);

  });
});
