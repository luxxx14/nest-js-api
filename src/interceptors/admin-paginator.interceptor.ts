import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminPaginatorInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map(({ entities, totalCount }) => {
        const res = context.switchToHttp().getResponse();

        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', totalCount);

        return entities;
      }),
    );
  }
}
