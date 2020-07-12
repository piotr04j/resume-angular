import { AuthService } from './auth.service';
import {defer, Observable, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(<any> httpClientSpy);
  });

  it('should send request', () => {
    const result = {
      "idToken": `123`,
      "email": 'test@wp.pl',
      "refreshToken": `123asd`,
      "expiresIn": `3600`,
    }
    httpClientSpy.post.and.returnValue(of(result));
    authService.signUp({email: 'test@wp.pl', password: 'qwe123'}).subscribe(
        res => expect(res).toEqual(result, 'test'),
        fail
    )

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'EMAIL_EXISTS'},
      status: 400,
    });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));
    authService.signUp({email: 'test@wp.pl', password: 'qwe123'}).subscribe(
      res => fail('should not execute this line'),
      errRes  => {
        expect(errRes.status).toBe(400);
        expect(errRes.error.message).toBe('EMAIL_EXISTS');
      }
    )
  })
});
