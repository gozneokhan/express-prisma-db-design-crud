import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    // PrismaClient() 안에 추가적인 기능을 {}객체 내부에 지정이 가능합니다.
    // Prisma를 이용해 데이터베이스를 접근할 때, SQL을 출력합니다.
    log: ['query', 'info', 'warn', 'error'],

    // 에러 메시지를 평문이 아닌, 개발자가 읽기 쉬운 형태로 출력합니다.
    errorFormat: 'pretty',
}); // PrismaClient 인스턴스를 생성합니다.
