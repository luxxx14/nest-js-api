import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminPaginationInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse();
        res.header('X-Total-Count', '1');
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        return data;
      }),
    );
  }
}
