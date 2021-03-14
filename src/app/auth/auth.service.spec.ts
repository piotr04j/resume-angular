import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(httpClientSpy as any);
  });

  it('should send signup request', () => {
    const result = {
      idToken: `123`,
      email: 'test@wp.pl',
      expiresIn: `3600`,
      localId: 'ABC123',
      refreshToken: 'abc123'
    };
    httpClientSpy.post.and.returnValue(of(result));
    authService.signUp({ email: 'test@wp.pl', password: 'qwe123' }).subscribe(
        res => expect(res).toEqual(result,),
        fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should return an error when the server returns a 400', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'EMAIL_EXISTS' },
      status: 400
    });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));
    authService.signUp({ email: 'test@wp.pl', password: 'qwe123' }).subscribe(
      res => fail('should not execute this line'),
      errRes  => {
        expect(errRes.status).toBe(400);
        expect(errRes.error.message).toBe('EMAIL_EXISTS');
      }
    );
  });

  it('should send signin request', () => {
    const result = {
      idToken: '123456',
      email: 'test@wp.pl',
      expiresIn: '3600',
      localId:  '1231',
      registered: true,
      refreshToken: 'abc123'
    };
    httpClientSpy.post.and.returnValue(of(result));
    authService.signIn({ email: 'test@wp.pl', password: 'qwe123' }).subscribe(
        res => expect(res).toEqual(result),
        fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should return true when user is authenticated', () => {
    authService.signedIn$.next({ signed: true, user: { userId: '123a', tokenId: 'qweqqq1', singInStart: 123, refreshToken: 'abc123' }});
    expect(authService.checkAuthState()).toBeTrue();
  });

  it('should log out user ', () => {
    authService.signedIn$.next({ signed: true, user: { userId: '123a', tokenId: 'qweqqq1', singInStart: 123, refreshToken: 'abc123' }});
    authService.signOut();
    expect(authService.signedIn$.value.signed).toBeFalse();
    expect(authService.signedIn$.value.user.userId).toBeNull();
    expect(authService.signedIn$.value.user.tokenId).toBeNull();
  });

  it('should return true if token is expired', () => {
    const currentHourInMilliseconds = 7 * 60 * 60 * 1000
    const sineInTime = 5 * 60 * 60 * 1000
    spyOn(Date, 'now').and.returnValue(currentHourInMilliseconds);

    authService.signedIn$.next({ signed: true, user: { userId: '123a', tokenId: 'qweqqq1', singInStart: sineInTime, refreshToken: 'abc123' }});
    expect(authService.isExpired()).toBeTrue();
  });

  it('should return false if token is not expired', () => {
    const currentHourInMilliseconds = 7 * 60 * 60 * 1000
    const sineInTime = 6.5 * 60 * 60 * 1000
    spyOn(Date, 'now').and.returnValue(currentHourInMilliseconds);

    authService.signedIn$.next({ signed: true, user: { userId: '123a', tokenId: 'qweqqq1', singInStart: sineInTime,  refreshToken: 'abc123' }});
    expect(authService.isExpired()).toBeFalse();
  });

  it('should send refresh token request', () => {
    const result = {
      expires_in: '3600',
      token_type: 'Bearer',
      refresh_token: 'qwe123',
      id_token:	'123qwe',
      user_id: 'abc123',
      project_id: 'aProject123'
    };
    httpClientSpy.post.and.returnValue(of(result));
    authService.refreshToken().subscribe(
        res => expect(res).toEqual(result),
        fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});

